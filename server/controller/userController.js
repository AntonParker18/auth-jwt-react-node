const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api.error')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Errors with validate', errors.array()))
      }

      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async activated(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json({ message: 'Working' })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
