const jwt = require('jsonwebtoken');

function authenticate (req, res, next) {
    try {
        const token = req.headers.access_token;
        req.decoded = jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        console.log(err, '<<<<<<<<<<<<<< err dari authenticate')
        next(err);
    }
}

module.exports = authenticate;