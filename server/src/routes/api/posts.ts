import express from "express";
import auth from "../../middleware/auth";
import { check, validationResult } from "express-validator";
import User from "../../db/User.model";
import Post from "../../db/Post.model";
import Profile from "../../db/Profile.model";

const postsRouter = express.Router();

/**
 * @route POST api/posts
 * @desc Create a post
 * @access Private
 */
postsRouter.post(
  "/",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user: any = await User.findById(req.user.id).select("-password");

      const newPost: any = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post: any = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route GET api/posts
 * @description Get all posts
 * @access Private
 */
postsRouter.get("/", auth, async (req: any, res: any) => {
  try {
    const posts: any = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
/**
 * @route GET api/posts/:id
 * @description Get post by id
 * @access Private
 */
postsRouter.get("/:id", auth, async (req: any, res: any) => {
  try {
    const post: any = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route DELETE api/posts/:id
 * @description Delete post by id
 * @access Private
 */

postsRouter.delete("/:id", auth, async (req: any, res: any) => {
  try {
    const post: any = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route PUT api/posts/like/:id
 * @description Like a post
 * @access Private
 */
postsRouter.put("/like/:id", auth, async (req: any, res: any) => {
  try {
    const post: any = await Post.findById(req.params.id);

    // check if post has already been liked by user
    if (
      post.likes.filter((like: any) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route PUT api/posts/unlike/:id
 * @description Unlike a post
 * @access Private
 */
postsRouter.put("/unlike/:id", auth, async (req: any, res: any) => {
  try {
    const post: any = await Post.findById(req.params.id);

    // check if post has already been liked by user
    if (
      post.likes.filter((like: any) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    // Get remove index
    const removeIndex: any = post.likes
      .map((like: any) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export { postsRouter };
