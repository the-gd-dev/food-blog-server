import express from "express";
import allRoutes from "@routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", allRoutes);

export default app;
