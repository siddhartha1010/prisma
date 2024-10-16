import prisma from "../utils/database.js";
import userSchema from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  const accessToken = generateAccessToken(user.id, user.email,user.username);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken,
    },
  });
  return { accessToken, refreshToken };
};

const createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const { email, username, password, role } = req.body;

    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      throw new Error("User with that email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const { refreshToken, accessToken } =
      await generateAccessTokenAndRefreshToken(user.id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: "success",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

const logout = async (req, res) => {
  const id = req.user.id;
  await prisma.user.update({
    where: { id },
    data: {
      refreshToken: null,
    },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: "success",
      message: "Logged out successfully",
    });
};

const refreshaccessToken = async (req, res) => {
  try {
    const incomingrefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingrefreshToken) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }
    console.log(incomingrefreshToken, "is the incoming refresh token");
    const decodedToken = jwt.verify(
      incomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(decodedToken, "is the decoded token");
    const user = await prisma.user.findFirst({
      where: { id: decodedToken.userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user?.refreshToken !== incomingrefreshToken) {
      throw new Error("Invalid refresh token");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user.id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: "success",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "fail",
      message: "An error occurred while processing your request.",
    });
  }
};

export { createUser, loginUser, logout, refreshaccessToken };
