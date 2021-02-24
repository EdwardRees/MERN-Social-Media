import bcrypt from "bcryptjs";
import config from "config";
import express from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import User from "../../db/User.model";
const userRouter = express.Router();

/**
 * @route POST api/users
 * @desc Register User
 * @access Public
 */
userRouter.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user !== null) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      let user_password: string = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        avatar,
        password: user_password,
      });

      await user.save();

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

export { userRouter };