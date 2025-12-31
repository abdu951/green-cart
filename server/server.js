import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

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


app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})