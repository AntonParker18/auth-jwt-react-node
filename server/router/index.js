const Router = require('express').Router
const userController = require('../controller/userController')
const router = new Router()
const { check } = require('express-validator')

router.post(
  '/registration',
  [
    check('email', 'Enter your email').isEmail(),
    check(
      'password',
      'Minimum length of your password 3 symbols and maximum is 30 symbols'
    ).isLength({ min: 3, max: 30 }),
  ],
  userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activated)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

module.exports = router
