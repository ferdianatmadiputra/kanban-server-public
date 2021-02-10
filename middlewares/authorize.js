const { UserOrganization } = require('../models/index');

function authorize (req, res, next) {
    let user_id = req.decoded.id;
    let org_id = req.params.org_id;
    UserOrganization.findOne({
        where: {
            UserId: user_id,
            OrganizationId: org_id
        }
    })
    .then((isValid) => {
        if (isValid) {
            next();
        } else {
            throw {
                name: "customError",
                msg: "Not authorized",
                status: 401
            };
        }
    })
    .catch(err => {
        next(err);
    })
}

module.exports = authorize;