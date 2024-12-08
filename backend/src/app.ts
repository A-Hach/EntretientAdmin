import express from "express";
import mongoose from "mongoose";
import analyticsRoutes from "./routes/analyticsRoutes";
import productsRoutes from "./routes/productsRoutes";

const app = express();
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use("/api/analytics", analyticsRoutes);
app.use("/api/products", productsRoutes);

export default app;
