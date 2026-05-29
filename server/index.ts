import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password : hashedPassword,
      },
    });

    res.json(user);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error,
    });
  }

});


app.post("/login", async (req, res) => {
  try {
    const { email, password} = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User ot found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    res.json ({
      message: "login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "login failed" })
  }
});

app.get("/me", authMiddleware, async (req, res) =>{
  const userId = (req as any).user.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  res.json(user);
})


app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("server started");
});