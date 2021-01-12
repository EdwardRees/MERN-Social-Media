import config from "config";
import express from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../../db/User.model";
import auth from "../../middleware/auth";
import bcrypt from "bcryptjs";

const authRouter = express.Router();

/**
 * @route GET api/auth
 * @desc Get User based on authenticate ID
 * @access Private
 */
authRouter.get("/", auth, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route POST api/auth
 * @desc Authenticate user and get token
 * @access Public
 */
authRouter.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user: any = await User.findOne({ email });

      if (user === null) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Check password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 18000,
        },
        (err, token: any) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

export { authRouter };
