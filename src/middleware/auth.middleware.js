const jwt = require("jsonwebtoken");
const UserModel = require('../models/user.model')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};