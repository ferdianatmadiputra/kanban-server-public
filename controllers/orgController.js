const { Organization, User, UserOrganization } = require('../models/index');
const createError = require('http-errors');

module.exports = class OrgController {

  static async postOrg(req, res, next) {
    let UserId = req.decoded.id;
    let { name } = req.body;
    try {
      let newOrg = await Organization.create({
        name
      })
      let OrganizationId = newOrg.id;
      await UserOrganization.create({
        UserId, OrganizationId
      })
      res.status(201).json(newOrg)
    } catch (err) {
      next(err);
    }
  }

  static async getOrg(req, res, next) {
    let UserId = req.decoded.id;
    try {
      let user = await User.findOne({
        include: {
          model: Organization,
          attributes: ['name','id'],
          through: {attributes:[]},
          include: [{
            model: User,
            attributes: ['profPic','id', 'firstName', 'lastName'],
            through: {attributes:[]}
          }],
        },
        where: {id : UserId}
      })
      res.status(200).json(user.Organizations)
    } catch (err) {
      next(err);
    }
  }

  static async delOrg(req, res, next) {
    let org_id = req.params.org_id;
    try {
      await Organization.destroy({
        where: { id: org_id }
      })
      res.status(200).json({ message: 'organization deleted  successfully' })
    } catch(err) {
        next(err)
    }
  }

  static async addMember(req, res, next) { 
    let OrganizationId = req.params.org_id;
    let email = req.body.email
    try {
      let user = await User.findOne({
        where: {
          email 
        },
      })
      let isMember = await UserOrganization.findOne({
        where: {
          UserId: user.id,
          OrganizationId
        }
      })
      console.log(isMember)
      if (!isMember) {
        let data = await UserOrganization.create({
          UserId: user.id, OrganizationId
        })
        res.status(201).json(data);
      }  else { // findOne return null if no match
        throw createError(400, 'User already joined the organization')
      }
    } catch (err) {
      next(err);
    }
  }
}