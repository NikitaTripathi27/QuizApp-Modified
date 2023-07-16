const httpStatus = require("http-status");
const UserService = require("./user.service");
const ApiError = require("../utils/ApiError");

const loginUserWithEmailAndPassword = async (email, password) => {
  console.log(email ,"email")
  const user = await UserService.findByEmail(email);
  if (!user || !(await user.isPasswordMatch(password)))
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  return user;
};

const loginUserWithUserNameAndPassword = async (username, password) => {
  const user = await UserService.findByUsername(username.toLowerCase());
  if (!user || !(await user.isPasswordMatch(password)))
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );
  return user;
};

const loginUserWithCredentials = async (loginKey, password) => {
  const loginType = loginKey.search(/@\w+\.\w+/) === -1 ? "username" : "email";

  switch (loginType) {
    case "username":
      return await loginUserWithUserNameAndPassword(loginKey, password);
      break;

    case "email":
      return await loginUserWithEmailAndPassword(loginKey, password);
      break;

    default:
      throw new ApiError("Invalid Credentials!");
      break;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithUserNameAndPassword,
  loginUserWithCredentials,
};
