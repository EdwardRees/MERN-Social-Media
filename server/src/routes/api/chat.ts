import express from "express";
const chatRouter = express.Router();

chatRouter.get("/", (req: any, res: any) => {
  res.send("Chat Router");
});

export { chatRouter };
