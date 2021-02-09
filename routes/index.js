const router = require('express').Router();
const user = require('./user.js')
const organization = require('./organization.js')

router.use('/user', user);
// router.use('/org', organization);


module.exports = router;