import { env } from "@/env";
import { sign, verify } from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const generateTokens = async (email: string) => {
  const accessToken = sign(
    { email },
    env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = sign(
    { email },
    env.JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = verify(token, env.JWT_SECRET);
    return decoded as { email: string };
  } catch (error) {
    throw new Error("Недействительный токен");
  }
}; 