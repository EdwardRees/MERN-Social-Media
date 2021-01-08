import express from "express";

const profileRouter = express.Router();

/**
 * @route GET api/profiles
 * @desc base route
 * @access Public
 */
profileRouter.get("/", (req: any, res: any) => {
  res.send("Profile route");
});

export { profileRouter };
