const router = require('express').Router();
const validateAccessToken = require('../accessTokenValidation');
const controller=require('../controllers/authController');

router.post('/register', controller.registerStudent);
router.post('/login', controller.loginStudent);
router.get('/user', validateAccessToken ,controller.getCurrentUser)

module.exports = router;