const {Organization} = require('../models/index');

module.exports = class OrgController {

    static postOrg (req, res, next) {
        Organization.findAll()
        
    }
}