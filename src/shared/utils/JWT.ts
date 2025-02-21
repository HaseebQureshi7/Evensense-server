import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
