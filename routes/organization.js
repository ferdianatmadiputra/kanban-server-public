const OrgController = require("../controllers/orgController");
const router = require("express").Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.use(authenticate);
router.post("/", OrgController.postOrg); // membuat organisasi baru
router.get("/", OrgController.getOrg); // mendapatkan list semua organisasi yang ada di server
// router.put("/:org_id", OrgController.editOrg) //edit organizations name
router.delete("/:org_id", authorize, OrgController.delOrg); // delete Org
router.post("/:org_id", authorize, OrgController.addMember); // delete Org

// router.get("/:org_id/tasks",authorize, OrgController.getTasks); //masuk ke kanban sebuah org
// router.post("/:org_id/tasks", authorize, OrgController.createTask); //membuat task baru
// router.put("/:org_id/tasks/:task_id", authorize, OrgController.putTaskById); //edit task
// router.patch("/:org_id/tasks/:task_id", authorize, OrgController.patchTaskById);
// router.delete("/:org_id/tasks/:task_id", authorize, OrgController.delTaskById); // delete task

module.exports = router;