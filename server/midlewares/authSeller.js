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