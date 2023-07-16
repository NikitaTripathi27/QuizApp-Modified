
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const userService = require('../services/user.service')
const tokenService = require('../services/token.service')
const authService = require('../services/auth.service')
const register = catchAsync(async (req, res) => {
    const user = await userService.create(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
    const { loginKey, password } = req.body;

    const user = await authService.loginUserWithCredentials(loginKey, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({ user, tokens });
});

module.exports = {
    register,
    login,
};