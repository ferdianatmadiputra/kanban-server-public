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


    // try {
    //   let organizations = await Organization.findAll({
    //     include: {
    //       model: User,
    //       attributes: ['profPic','id', 'firstName', 'lastName'],
    //       required: false,
    //       right: true,
    //       through: {attributes:[]}
    //     },
    //     where: {'$Users.id$': UserId}
    //   })
    //   res.status(200).json(organizations)
    // } catch (err) {
    //   next(err);
    // }

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

  static async addMember(req, res, next) { 
    let OrganizationId = req.params.org_id;
    let email = req.body.email
    try {
      let user = await User.findOne({
        where: {
          email 
        },
      })
      let isNonMember = await UserOrganization.findOne({
        where: {
          UserId: user.id,
          OrganizationId
        }
      })
      if (isNonMember) {
        let data = await UserOrganization.create({
          UserId: user.id, OrganizationId
        })
        res.status(201).json(data)
      }  else {
        throw {
          name: "customError",
          msg: "User already a member of the organization",
          status: 404
        }
      }
    } catch (err) {
      next(err);
    }
  }
}