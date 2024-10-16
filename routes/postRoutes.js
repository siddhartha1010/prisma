import express from "express";
import { createPost } from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/posts", verifyJWT, createPost);

export default router;
