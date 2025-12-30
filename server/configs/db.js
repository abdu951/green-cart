import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('database connected successfully'));
        await mongoose.connect(`${process.env.MONGODB_URI}/green-cart`)
    } catch (error) {
        console.error(error.message);
        console.log("Mongo URI:", process.env.MONGODB_URI);
        
    }
}

export default connectDB;