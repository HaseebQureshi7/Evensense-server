import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include `userId`
declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return; // Prevent further execution
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: number };
    if (!decoded.userId) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    req.userId = decoded.userId; // Attach userId to request
    next(); // Only proceed if token is valid
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
