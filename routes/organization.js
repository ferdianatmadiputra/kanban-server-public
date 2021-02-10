const OrgController = require("../controllers/orgController");
const router = require("express").Router();
const authorize = require('../middlewares/authorize');

router.post("/", OrgController.postOrg); // membuat organisasi baru
router.get("/", OrgController.getOrg); // mendapatkan list semua organisasi yang ada di server
// router.put("/:org_id", OrgController.editOrg) //edit organizations name
router.delete("/:org_id", authorize, OrgController.delOrg); // delete Org
router.post("/:org_id", authorize, OrgController.addMember); // addMember

module.exports = router;
