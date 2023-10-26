import { User } from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
import ConfigConstants from "../constant/ConfigConstants.js";
const userLoginByGoogle = async (email) => {
  try {
    console.log(email);
    const existingUser = await User.findOne({ userEmail: email }).exec();
    if (!existingUser || existingUser.length === 0) {
      return {
        response: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_USER_SUCCESS,
      data: existingUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};
const userRegisterByGoogle = async ({ username, email, avatarImgUrl }) => {
  try {
    const newUser = await User.create({
      userEmail: email,
      userName: username,
      userAvatarUrl: avatarImgUrl,
      roleId: ConfigConstants.USER_ROLE_ID,
    });
    if (!newUser) {
      return {
        success: false,
        message: Exception.CANNOT_REGISTER_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.REGISTER_SUCCESS,
      data: newUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};
export default {
  userLoginByGoogle,
  userRegisterByGoogle,
};
