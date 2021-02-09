const { User } = require('../models/index');

function authorize (req, res, next) {
    let id = req.decoded.id;
    User.findByPk(id)
    .then((user) => {
        if (!user) {
            res.status(401).json({msg: 'not authorized'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({msg: 'internal server error'})
    })
}

module.exports = authorize;