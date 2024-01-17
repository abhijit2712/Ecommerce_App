import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
import cors  from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

//configure env
dotenv.config();

//rest object
const app = express();

//database config
connectDB();



//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth',router);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoutes);

//rest api
app.use('*',function(){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

//PORT
const PORT = process.env.PORT || 8000;


//run listen
app.listen(PORT,()=>{
    console.log(`Server running on 
    ${process.env.DEV_MODE} mode on port
    ${PORT}`.bgCyan.white);
})

