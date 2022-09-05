const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const emailService = require('./email-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api.error')

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with this email: ${email} already exists`)
    }

    const hashPassword = bcrypt.hashSync(password, 3)
    const activationLink = uuid.v4()

    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    })

    emailService.sendActivationEmail(email, activationLink)

    const userDto = new UserDto(user) // id, email, isActivated
    const tokens = tokenService.generationToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

module.exports = new UserService()
