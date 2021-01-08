import express from "express";
const chatRouter = express.Router();

/**
 * @route GET api/chat
 * @desc base route
 * @access Public
 */
chatRouter.get("/", (req: any, res: any) => {
  res.send("Chat Router");
});

export { chatRouter };
