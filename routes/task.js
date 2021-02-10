const TaskController = require("../controllers/taskController");
const router = require("express").Router();
const authorize = require('../middlewares/authorize');

// route prefix /org/:org_id/task
router.get("/",authorize, TaskController.getTasks); //masuk ke kanban sebuah org
router.post("/", authorize, TaskController.createTask); //membuat task baru
router.put("/:task_id", authorize, TaskController.putTaskById); //edit task
router.patch("/:task_id", authorize, TaskController.patchTaskById);
router.delete("/:task_id", authorize, TaskController.delTaskById); // delete task

module.exports = router;