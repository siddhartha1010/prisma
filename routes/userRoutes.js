import express from "express";
import {
  createUser,
  loginUser,
  logout,
  refreshaccessToken,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
// import checkRolePermission from "../middlewares/checkRole.js";

import { checkRolePermission } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/users", createUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logout);
router.post("/refresh", refreshaccessToken);
router.get(
  "/dashboard",
  verifyJWT,
  checkRolePermission("admin"),
  (req, res) => {
    // Admin-specific route logic
    res.json({ message: "Admin dashboard access granted" });
  }
);

export default router;
