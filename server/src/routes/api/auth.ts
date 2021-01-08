import express from "express";
import User from "../../db/User.model";
import auth from "../../middleware/auth";

const authRouter = express.Router();

/**
 * @route GET api/auth
 * @desc base route
 * @access Public
 */
authRouter.get("/", auth, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export { authRouter };
