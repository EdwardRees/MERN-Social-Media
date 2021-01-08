import express from "express";

const postsRouter = express.Router();

/**
 * @route GET api/postss
 * @desc base route
 * @access Public
 */
postsRouter.get("/", (req: any, res: any) => {
  res.send("Posts route");
});

export { postsRouter };
