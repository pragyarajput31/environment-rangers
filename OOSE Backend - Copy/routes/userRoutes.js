import express from "express";
import {
  signIn,
  register,
  postCheckAuthenticated,
  getUserIsAuthenticated,
  getUserLogout,
  contactUsForm,
  createCreditDevice,
  getAllDevices,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
// import { errorMonitor } from 'nodemailer/lib/xoauth2/index.js';
import { errorHandler, notFound } from "../middlewares/errorMiddleware.js";
const router = express.Router();

router.post("/login", signIn);
router.post("/register", register);
router.post("/contact", contactUsForm);
router.post("/creditdevice", createCreditDevice);
router.get("/creditdevice", getAllDevices);



router.post("/checkAuthenticated", protect, postCheckAuthenticated);
router.get(
  "/isAuthenticated",
  protect,
  notFound,
  errorHandler,
  getUserIsAuthenticated
);
router.get("/logout", getUserLogout);

export default router;
