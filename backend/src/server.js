import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middlewares
app.use(
  cors({
    origin: "",
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
app.use("/api/auth/", authRoutes);
connectDb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
  });
});
