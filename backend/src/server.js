// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import foodRouter from "./routers/food.router.js";
// import userRouter from "./routers/user.router.js";
// import orderRouter from "./routers/order.router.js";
// import {fileURLToPath} from 'url';
// import { dbconnect } from "./config/database.config.js";
// import { dirname } from "path";
// dbconnect();

// const __filename=fileURLToPath(import.meta.url);
// const __dirname=dirname(__filename);

// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000"],
//   })
// );



// app.use("/api/foods", foodRouter);
// app.use("/api/users", userRouter);

// app.use("/api/orders", orderRouter);
// const publicFolder=path.join(__dirname,'public');
// app.use(express.static(publicFolder,'index.html'));

// app.get('*',(req,res)=>{
//     const indexFilePath=path.join(publicFolder,'index.js');
//     res.sendFile(indexFilePath);

// })

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log("listening on port" + PORT);
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { fileURLToPath } from 'url';
import { dbconnect } from "./config/database.config.js";
import { dirname, join } from "path"; // Import join function from path module
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const publicFolder = join(__dirname, 'public'); // Use join function to concatenate directory paths
app.use(express.static(publicFolder)); // Remove 'index.html' from the parameters

app.get('*', (req, res) => {
    const indexFilePath = join(publicFolder, 'index.html'); // Use join function to concatenate directory paths
    res.sendFile(indexFilePath);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
