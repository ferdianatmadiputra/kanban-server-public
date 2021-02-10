const { Organization, User, UserOrganization } = require('../models/index');

module.exports = class OrgController {

  static async postOrg(req, res, next) {
    let UserId = req.decoded.id;
    let { name } = req.body;
    try {
      let newOrg = await Organization.create({
        name
      })
      let OrganizationId = newOrg.id;
      let data = await UserOrganization.create({
        UserId, OrganizationId
      })
      res.status(200).json(newOrg)

    } catch (err) {
      next(err);
    }

  }

  static async getOrg(req, res, next) {
    let UserId = req.decoded.id;
    try {
      let organizations = await Organization.findAll({
        include: {
          model: User,
          attributes: ['profPic','id', 'firstName', 'lastName'],
          through: {attributes:[]}
        },
        where: {'$Users.id$': UserId}
      })
      res.status(200).json(organizations)
    } catch (err) {
      next(err);
    }

  }

  static async delOrg(req, res, next) {
    let org_id = req.params.org_id;
    try {
      let data = Organization.destroy({
        where: { id: org_id }
      })
      if (!data) { // if id not found, data value is 0
        throw {
          name: "customError",
          msg: "Error not found",
          status: 404
        };
      } else {
        res.status(200).json({ message: 'organization deleted  successfully' })
      }
    } catch(err) {
        next(err)
      }
  }

  static addMember(req, res, next) { }
}