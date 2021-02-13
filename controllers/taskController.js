const { User, Organization, Task, UserOrganization } = require('../models/index');
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
    let userEmail = req.body.email;
    let title = req.body.title;
    let category = req.body.category;
    try {
      console.log(userEmail, title, category);
      if (!userEmail || !title || !category){
        throw createError(400, 'Bad Request, please fill all form fields')
      }
      let user = await User.findOne({
        where: {
          email: userEmail,
        }
      })
      if(!user){
        throw createError(404, 'Error Assigned User not found')
      }
      let isMember = await UserOrganization.findOne({
        where: {
          OrganizationId: org_id,
          UserId: user.id
        }
      })
      if (!isMember) {
        throw createError(401, 'Error Assigned User not a member of this org')
      }
      let UserId = user.id;
      let newTask = await Task.create({
        title,
        category,
        OrganizationId: org_id,
        UserId
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
    let {title, category, email} = req.body;
    console.log({title, category, email})
    try {
      if (!email || !title || !category){
        throw createError(400, 'Bad Request, please fill all form fields')
      }
      let user = await User.findOne({
        where: {
          email:email
        }
      })
      if(!user){

        console.log(user,'ini isi user')
        throw createError(404, 'Error Assigned User not found')
      }
      let isMember = await UserOrganization.findOne({
        where: {
          OrganizationId,
          UserId: user.id
        }
      })
      if (!isMember) {
        throw createError(401, 'Error Assigned User not a member of this org')
      }
      let UserId = user.id;
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
