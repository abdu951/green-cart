import jwt from "jsonwebtoken";


/*
import bcrypt from "bcryptjs";
import Seller from "../models/seller.js";

// register a new user: /api/user/register
export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "missing details"})
    } 

      const existingSeller = await Seller.findOne({ email })
        if (existingSeller) 
            return res.json({ success: false, message: "seller already exists" });
        

        const hashedPassword = await bcrypt.hash(password, 10);

        const seller = await Seller.create({name, email, password: hashedPassword});

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('sellerToken', token, {
            httpOnly: true,  //prevent javascript to access the cookie
            secure: process.env.NODE_ENV === 'production',  // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days cookie expiration
        })

        return res.json({ success: true, user: { name: seller.name, email: seller.email } });
    
    }catch (error) {

        console.log(error.message)
        res.send({ success: false, message: error.message });
    }
}*/

// login a seller: /api/seller/login
export const sellerLogin = async(req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('sellerToken', token, {
            httpOnly: true,  //prevent javascript to access the cookie
            secure: process.env.NODE_ENV === 'production',  // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // csrf protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days cookie expiration
        })

        return res.json({ success: true, message: "logged in successfully" });

        }else {
            return res.json({ success: false, message: "invalid credentials" });
        }

    
    }catch (error) {

        console.log(error.message)
        res.send({ success: false, message: error.message });
    }
}



// =================seller AUTH CHECK =================
export const isSellerAuth = async (req, res) => {
    try {

        return res.json({success: true});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};


// logout a seller: /api/seller/logout

export const sellerLogout = async(req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "logged out successfully"})

    } catch (error) {
        console.log(error.message)
        res.send({ success: false, message: error.message });
    }
}

