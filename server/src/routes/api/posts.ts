import express from "express";

const postsRouter = express.Router();

/** 
 * @route GET api/posts
 * @desc base route
 * @access Public
 */
postsRouter.get("/", (req: any, res: any) => {
  res.send("Posts route");
});

export { postsRouter };
