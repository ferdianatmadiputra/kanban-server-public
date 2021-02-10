const router = require('express').Router();
const user = require('./user.js')
const organization = require('./organization.js');
const errorhandler = require('../middlewares/errorhandler.js');

router.use('/user', user);
router.use('/org', organization);
router.use(errorhandler);


module.exports = router;