import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// allow multiple origins 
const allowedOrigins = ['http://localhost:5173'];


// Middlewares configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => {
    res.send('api is working')    
})

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);



app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})