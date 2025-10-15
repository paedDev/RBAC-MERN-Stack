import express from "express";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/admin", verifyToken, (req, res) => {
  res.json({
    message: "Welcome Admin!",
  });
});

router.get("/customer", (req, res) => {
  res.json({ message: "Welcome Customer!" });
});

export default router;
