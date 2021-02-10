const router = require('express').Router();
const user = require('./user.js')
const organization = require('./organization.js');
const errorhandler = require('../middlewares/errorhandler.js');
const authenticate = require('../middlewares/authenticate');

router.use('/user', user);
router.use(authenticate);
router.use('/org', organization);

router.use(errorhandler);


module.exports = router;