const OrgController = require("../controllers/orgController");
const TaskController = require("../controllers/taskController");
const router = require("express").Router();
const authorize = require('../middlewares/authorize');

router.post("/", OrgController.postOrg); // membuat organisasi baru
router.get("/", OrgController.getOrg); // mendapatkan list semua organisasi yang ada di server
// router.put("/:org_id", OrgController.editOrg) //edit organizations name
router.delete("/:org_id",authorize, OrgController.delOrg); // delete Org
router.post("/:org_id", authorize,OrgController.addMember); // addMember

router.get("/:org_id/task", authorize, TaskController.getTasks); //masuk ke kanban sebuah org
router.post("/:org_id/task",authorize,TaskController.createTask); //membuat task baru
router.put("/:org_id/task/:task_id", authorize, TaskController.putTaskById); //edit task
router.patch("/:org_id/task/:task_id",authorize, TaskController.patchTaskById);
router.delete("/:org_id/task/:task_id",authorize, TaskController.delTaskById); // delete task

module.exports = router;
