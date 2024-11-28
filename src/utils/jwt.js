import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_TOKEN_EXPIRE = process.env.JWT_ACCESS_TOKEN_EXPIRE;
const JWT_REFRESH_TOKEN_EXPIRE = process.env.JWT_REFRESH_TOKEN_EXPIRE;

const createAccessToken = (data = {}) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
  });
};


// Function to create a refresh token
const createRefreshToken = (data = {}) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
  });
};


// Function to verify a token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { createAccessToken, createRefreshToken, verifyToken };