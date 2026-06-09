import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth";
import { Prisma } from "@prisma/client";

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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    res.json({ user, token });

  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === "P2002") {
        return res.status(400).json({
          message: "email already in use",
        });
      }
    }


    res.status(500).json({
      message: "something went wrong",
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
      return res.status(404).json({ message: "User not found" });
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

app.post("/generate-playlist", authMiddleware, async (req, res) =>{

  const userId = (req as any).user.userId;

  try {
    const { mood } = req.body;
    console.log("generate playlist request received with mood:", mood);

    if (!mood) {
      return res.status(400).json({
        message: "mood is required",
      });
    }
    console.log("recieved mood:", mood);

    const playlist = {
      name: `${mood} vibes`,
      mood,
      songs: [
        "song 1 - chill artist",
        "song 2 - moodmaker",
        "song 3 - nightflow",
        "song 4 - vibe curator",
        "song 5 - mellow tunes",
      ],
      image: "https://placehold.co/300x300",
      description: `a playlist to match your ${mood} mood`,
    }

    const savedPlaylist = await prisma.playlist.create({
      data: {
        name: playlist.name,
        mood: playlist.mood,
        description: playlist.description,
        userId,
      },
    });

    return res.json(savedPlaylist);

  } catch (err) {
    console.log("ERROR:", err);

    return res.status(500).json({
      message: "Something broke in playlist generation",
    });
  }

})

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