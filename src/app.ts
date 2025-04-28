import express from "express";
import allRoutes from "@routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", allRoutes);

export default app;
