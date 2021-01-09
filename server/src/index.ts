import express from "express";
import { connectDB } from "./config";
import {
  authRouter,
  chatRouter,
  eventsRouter,
  postsRouter,
  profileRouter,
  userRouter,
} from "./routes/api";

const app = express();

const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Init middlware
app.use(express.json());

// define Routes

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req: any, res: any) => {
  res.send("API Running");
});

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
