const jwt = require('jsonwebtoken');

function authenticate (req, res, next) {
    try {
        const token = req.headers.access_token;
        req.decoded = jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate;