const { UserOrganization, Organization } = require('../models/index');
const createError = require('http-errors');

async function authorize(req, res, next) {
  let user_id = req.decoded.id;
  let org_id = req.params.org_id;
  // task cari organisasinya ada dulu atau tidak
  try {
    let orgIsExist = await Organization.findByPk(org_id);
    if (!orgIsExist) {
      throw createError(404, 'Error Organization not found')
    } else {
      let isValid = await UserOrganization.findOne({
        where: {
          UserId: user_id,
          OrganizationId: org_id
        }
      })
      if (!isValid) {
        throw createError(401, "Unauthorized")
      } else {
        next();
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authorize;