import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.json({
    message: "login received",
    email,
  });
});


app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("server started");
});