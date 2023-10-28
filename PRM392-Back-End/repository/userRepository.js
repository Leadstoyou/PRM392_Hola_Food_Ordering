import { User } from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
import ConfigConstants from "../constant/ConfigConstants.js";
const userLoginByGoogle = async (email) => {
  try {
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
const userRegisterByLocal = async ({username,email,password,address,phoneNumber}) => {
  try {
    const existingUser = await User.findOne({ userEmail:email }).exec();

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const newUser = await User.create({
      userName:username,
      userEmail:email,
      userPassword:password, // Lưu ý: Cần mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
      userAddress:address,
      userPhoneNumber:phoneNumber,
    });

    const userWithoutPassword = { ...newUser._doc };
    delete userWithoutPassword.userPassword;
    return {
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};
const userLoginByLocal = async ({ email, password }) => {
  try {
    const existingUser = await User.findOne({
      userEmail: email,
      userPassword: password,
    }).exec();
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
export default {
  userLoginByGoogle,
  userRegisterByGoogle,
  userRegisterByLocal,
  userLoginByLocal,
};
