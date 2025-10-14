import express from "express";
import { Login, Register } from "../controller/authController.js";

const router = express.Router();

router.post("/login", Login);
router.get("/register", Register);

export default router;
