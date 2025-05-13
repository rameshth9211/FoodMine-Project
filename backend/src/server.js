import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { fileURLToPath } from 'url';
import { dbconnect } from "./config/database.config.js";
import { dirname, join } from "path";
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(
  cors({ 
    credentials: true,
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ["http://localhost:3000"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const publicFolder = join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
    const indexFilePath = join(publicFolder, 'index.html');
    res.sendFile(indexFilePath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
