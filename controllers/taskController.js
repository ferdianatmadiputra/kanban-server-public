const { User, Organization, Task } = require('../models/index');

module.exports = class TaskController {
  //authorize sudah menghandle keabsahan user id dan org id
  static async getTasks(req, res, next) {
    let org_id = req.params.org_id;
    try {
      Task.findAll({
        where: {
          OrganizationId: org_id
        }
      })
    } catch (err) {
      next(err)
    }
  }

  static async createTask(req, res, next) {
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
  }

  static async createTask(req, res, next) {
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
  }

  static async putTaskById(req, res, next) {
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
  }

  static async patchTaskById(req, res, next) {
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
  }

  static async delTaskById(req, res, next) {
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
  }

}
