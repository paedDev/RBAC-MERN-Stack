import express from "express";
import {
  Login,
  Register,
  GetAllUser,
  UpdateUser,
  DeleteUser,
} from "../controller/authController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/user", verifyToken, verifyAdmin, GetAllUser);
router.put("/login", verifyToken, verifyAdmin, UpdateUser);
router.delete("/register", verifyToken, verifyAdmin, DeleteUser);

export default router;
