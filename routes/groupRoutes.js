import express from "express";
import { createGroup } from "../controllers/groupController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/groups", verifyJWT, createGroup);

export default router;
