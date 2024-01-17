import express from "express";
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from "url";
import cors from "cors";
import path from 'path';

dotenv.config();

connectDB();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"./client/build")))

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.get('/', (req, res) => {
    res.send({
        message: "<h1>hello world welcome to new ecommerce app</h1>",
    });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on  ${PORT}`.bgCyan.white);
});

