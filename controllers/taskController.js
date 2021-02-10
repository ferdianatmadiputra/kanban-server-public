const { User, Organization, Task } = require('../models/index');
const createError = require('http-errors');

module.exports = class TaskController {
  //authorize sudah menghandle keabsahan user id dan org id
  static async getTasks(req, res, next) {
    let org_id = req.params.org_id;
    try {
      let tasks = await Task.findAll({
        where: {
          OrganizationId: org_id
        } 
      })
      res.status(200).json(tasks);
    } catch (err) {
      next(err)
    }
  }

  static async createTask(req, res, next) {
    let org_id = req.params.org_id;
    try {
      let newTask = await Task.create({
        title: req.body.title,
        category: req.body.category,
        OrganizationId: org_id,
        UserId: req.decoded.id,
      })
      res.status(201).json(newTask)
    } catch (err) {
      next(err)
    }
  }

  static async putTaskById(req, res, next) {
    //errorhandler org sudah di authorize
    let OrganizationId = req.params.org_id;
    let task_id = req.params.task_id;
    let UserId = req.decoded.id;
    let {title, category} = req.body;
    try {
      let task = await Task.update({ title, category, OrganizationId, UserId },{
        where: { id: task_id },
        returning: true
      })
      if (task[0] == 1) {
        console.log(task)
        res.status(200).json(task[1][0])
      } else {
        throw createError(404, 'Error Task not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async patchTaskById(req, res, next) {
    //errorhandler org sudah di authorize
    let org_id = req.params.org_id;
    let task_id = req.params.task_id;
    console.log(task_id)
    let category = req.body.category
    try {
      let task = await Task.update({ category },{
        where: { id: task_id },
        returning: true
      })
      if (task[0] == 1) {
        res.status(200).json(task[1][0])
      } else {
        throw createError(404, 'Error Task not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async delTaskById(req, res, next) {
    let task_id = req.params.task_id;
    try {
      let deletedTask = await Task.destroy({
        where: {
          id: task_id
        }
      })
      if (deletedTask == 1){
        res.status(200).json({message: 'task deleted successfully'})
      } else {
        throw createError(404, 'Error Task not found')
      }
    } catch (err) {
      next(err)
    }
  }

}
