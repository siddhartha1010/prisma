import express from "express";
import { createProfile } from "../controllers/profileController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/profile", verifyJWT, createProfile);

export default router;
