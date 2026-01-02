import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
    const sellerToken = req.cookies.sellerToken;

    if (!sellerToken) {
        return res.json({success: false, message: "Not authorized"});
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        if (decoded.email === process.env.SELLER_EMAIL) {

            next();

        }else {
            return res.json({success: false, message: "Not authorized"});
        }

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

export default authSeller;


/* 
import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
    try {
        const token = req.cookies.sellerToken;

        if (!token) {
            return res.status(401).json({success: false, message: "Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach seller info to request (industry standard)
        req.seller = { email: decoded.email, role: "seller"};

        // Authorization check
        if (req.seller.email !== process.env.SELLER_EMAIL) {
            return res.status(403).json({success: false,message: "Access denied"});
        }

        next();

    } catch (error) {
        return res.status(401).json({success: false,message: "Invalid or expired token"});
    }
};

export default authSeller;
*/