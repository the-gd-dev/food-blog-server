import express from "express";
import allRoutes from "@routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", allRoutes);

export default app;
