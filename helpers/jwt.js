const jwt = require('jsonwebtoken');

function generateToken(dataObj) {
    return jwt.sign(dataObj, process.env.SECRET)
}

module.exports= {generateToken}