import express from "express";
import { createComment } from "../controllers/commentControllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/post/:id", verifyJWT, createComment);

export default router;
