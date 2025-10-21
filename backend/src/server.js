import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
  next();
});
app.get("/hello", (req, res) => {
  res.send("hello");
  // testing purposes
});
app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
  });
});
