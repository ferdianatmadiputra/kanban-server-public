const jwt = require('jsonwebtoken');

function authenticate (req, res, next) {
    try {
        const token = req.headers.access_token;
        req.decoded = jwt.verify(token, process.env.SECRET);
        next();
    } catch {
        res.status(401).json({ msg: 'invalid token'})
    }
}

module.exports = authenticate;