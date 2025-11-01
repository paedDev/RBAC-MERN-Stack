import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
export default router;
