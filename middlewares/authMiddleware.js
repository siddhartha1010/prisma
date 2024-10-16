import dotenv from "dotenv";
import prisma from "../utils/database.js";
import jwt from "jsonwebtoken";
dotenv.config();

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }
    console.log(token, "is the tokem");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken, "is the decoded token");
    const user = await prisma.user.findFirst({
      where: { id: decodedToken.userId },
    });
    console.log(user, "is the user");
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      const refreshToken =
        req.cookies?.refreshToken ||
        req.header("Authorization")?.replace("Bearer ", "").trim();

      if (refreshToken) {
        await prisma.user.updateMany({
          where: {
            refreshToken,
          },
          data: {
            refreshToken: null,
          },
        });
      }
    }

    console.error("Token verification error:", err);

    res.status(401).json({
      status: "fail",
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export { verifyJWT };
