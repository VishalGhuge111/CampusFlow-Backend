import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  changePassword,
  profileForgotPassword,
} from "../controllers/authController.js";
import {
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/profile-forgot-password", profileForgotPassword);
router.post("/change-password", authMiddleware, changePassword);

export default router;
