import express from "express";
import { connectDB } from "./config";
import http from "http";
import cors from "cors";
import {
  authRouter,
  chatRouter,
  eventsRouter,
  postsRouter,
  profileRouter,
  userRouter,
} from "./routes/api";

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

// Connect to database
connectDB();

app.use(function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(
  cors()
  /*{
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  }*/
);
// Init middleware
app.use(express.json());

// define Routes

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/chat", chatRouter);

app.get("/api", (req: any, res: any) => {
  res.send("API Running");
});

// app.listen(PORT, () => console.info(`Server started on port ${PORT}`));

// export default app;

server.listen(PORT, () => console.info(`Server started on port ${PORT}`));
export default server;
