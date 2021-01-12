import config from "config";
import jwt from "jsonwebtoken";

const jwtSecret: string = config.get("jwtSecret");

export default function (req: any, res: any, next: any) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token if available
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    // console.error(`Auth Middleware: ${err.message}`);
    res.status(401).json({ msg: "Invalid token" });
  }
}
