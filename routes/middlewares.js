const jwt = require('jsonwebtoken');
require('dotenv').config();

function adminOnly (req, res, next) {
    if (req.decoded.role == 'admin') return next();
    res.status(401).send('You are not an admin');
}

function isUserLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Not authorized');

    const tokenType = authHeader.split(" ")[0];
    const tokenValue = authHeader.split(" ")[1];

    if (tokenType.toLowerCase() == 'bearer') {
        const decoded = jwt.verify(tokenValue, process.env.secret);
        req.decoded = decoded;
        return next();
    }

    res.status(401).send('Not authorized');
}

module.exports = {
    isUserLoggedIn, adminOnly
}