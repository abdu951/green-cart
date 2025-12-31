import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register a new user: /api/user/register
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "missing details"})
    } 

      const existingUser = await User.findOne({ email })
        if (existingUser) 
            return res.json({ success: false, message: "user already exists" });
        

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,  //prevent javascript to access the cookie
            secure: process.env.NODE_ENV === 'production',  // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days cookie expiration
        })

        return res.json({ success: true, user: { name: user.name, email: user.email } });
    
    }catch (error) {

        console.log(error.message)
        res.send({ success: false, message: error.message });
    }
}