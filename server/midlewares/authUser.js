import jwt from 'jsonwebtoken';


/* const authUser = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "not authorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id; // 👈 IMPORTANT
        } else {
            return res.json({ success: false, message: "not authorized" });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
*/


const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({success: false, message: "Not authorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user info to request (industry standard)
        req.user = {id: decoded.id};   // 👈 IMPORTANT

        next();

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};

export default authUser;
