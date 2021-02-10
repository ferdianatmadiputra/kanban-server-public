const router = require('express').Router();
const UserController  = require('../controllers/userController');

router.post('/register', UserController.postRegister);
router.post('/login', UserController.postLogin);
router.post('/googlelogin', UserController.googleLogin)

module.exports = router;