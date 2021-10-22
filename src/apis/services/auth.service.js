const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const userService  = require('./user.service')
const { User } = require('../models')

const loginUserwithEmailAndPassword = async (email,password)=>{
  const user = await userService.getUserByEmail(email);
  if(!user || !await (user.isPasswordMatch(password))){
    throw new ApiError(httpStatus.UNAUTHORIZED,"Tài khoản hoặc mật khẩu không đúng")
  }
  return user
}

module.exports = {
  loginUserwithEmailAndPassword
}