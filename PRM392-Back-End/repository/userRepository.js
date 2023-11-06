import { User } from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
import ConfigConstants from "../constant/ConfigConstants.js";
import sendMailService from "../service/sendMailService.js";
import generateOTPWithExpiration from "../service/createOTP.js";
import cloudinaryService from "../service/cloudinaryService.js";

const userSearchRepository = async ({ page, size, search, role }) => {
  try {
    const matchQuery = {
      $or: [
        {
          userName: { $regex: `.*${search}.*`, $options: "i" },
        },
        {
          userEmail: { $regex: `.*${search}.*`, $options: "i" },
        },
      ],
    };
    if (role != undefined) {
      matchQuery.roleId = role;
    }

    const totalUsers = await User.countDocuments(matchQuery);
    console.log(totalUsers);
    if (totalUsers == 0) {
      return {
        success: false,
        message: "No data",
      };
    }
    if (!size) {
      size = totalUsers;
    }

    let filteredUsers = await User.aggregate([
      {
        $match: matchQuery,
      },
      { $skip: (page - 1) * size },
      { $limit: size },
    ]);

    if (!filteredUsers) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    return {
      success: true,
      message: SuccessConstants.GET_USER_SUCCESS,
      data: {
        total: totalUsers,
        users: filteredUsers,
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userLoginByGoogle = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser || existingUser.length === 0) {
      return {
        success: false,
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

const userRegisterByGoogle = async ({ userName, userEmail, userAvatarUrl }) => {
  try {
    const newUser = await User.create({
      userEmail,
      userName,
      userAvatarUrl,
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

const userRegisterByLocal = async ({
  userName,
  userEmail,
  userPassword,
  userPhoneNumber,
  userAddress,
}) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (existingUser) {
      return {
        success: false,
        message: Exception.USER_EXIST,
      };
    }
    const newUser = await User.create({
      userName,
      userEmail,
      userPassword,
      userAddress,
      userPhoneNumber,
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

const userLoginByLocal = async ({ userEmail, userPassword }) => {
  try {
    const existingUser = await User.findOne({
      userEmail,
    }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    const isMatched = bcrypt.compareSync(
      userPassword,
      existingUser.userPassword
    );
    if (!isMatched) {
      return {
        success: false,
        message: Exception.WRONG_EMAIL_AND_PASSWORD,
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

const userForgotPasswordRepository = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    const resetCode = generateOTPWithExpiration.generateOTPWithExpiration().otp;
    existingUser.resetPasswordOTP = resetCode;
    await existingUser.save();
    const emailSubject = "Bạn forgot password";
    const emailBody = `Đây là mã code resetpassword, mã code tồn tại trong 15p: ${resetCode}`;
    await sendMailService.sendEmailService(userEmail, emailSubject, emailBody);
    return {
      success: true,
      message: SuccessConstants.FORGOT_PASSWORD_SUCCESS,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userResetPasswordRepository = async (resetPasswordOTP, newPassword) => {
  try {
    const existingUser = await User.findOne({
      resetPasswordOTP,
    }).exec();

    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_WRONG_RESET_PASSWORD_TOKEN,
      };
    }

    if (
      Date.now() >
      generateOTPWithExpiration.generateOTPWithExpiration().expiration.getTime()
    ) {
      return {
        success: false,
        message: "otp EXPIRED",
      };
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    existingUser.userPassword = hashedPassword;
    existingUser.resetPasswordOTP = undefined;
    await existingUser.save();

    return {
      success: true,
      message: SuccessConstants.RESET_PASSWORD_SUCCESS,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userChangePasswordRepository = async ({
  userEmail,
  oldPassword,
  newPassword,
}) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const isMatched = await bcrypt.compare(
      oldPassword,
      existingUser.userPassword
    );
    if (!isMatched) {
      return {
        success: false,
        message: Exception.PASSWORD_NOT_MATCH,
      };
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      { userPassword: hashedPassword },
      { new: true }
    ).exec();

    return {
      success: true,
      message: SuccessConstants.CHANGE_PASSWORD_SUCCESS,
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not show",
      },
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userViewProfileRepository = async (userEmail) => {
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }
    return {
      success: true,
      message: SuccessConstants.VIEW_PROFILE_SUCCESS,
      data: existingUser,
    };
  } catch (exception) {
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateProfileRepository = async ({
  userEmail,
  userName,
  userPhoneNumber,
  userAddress,
  userAvatarUrl,
}) => {
  let userAvt = null;
  try {
    const existingUser = await User.findOne({ userEmail }).exec();
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    if (userAvatarUrl) {
      userAvt = await cloudinaryService.uploadProductImageToCloudinary(
        userAvatarUrl,
        ConfigConstants.CLOUDINARY_USER_AVATAR_IMG
      );
    }

    const updateFields = {
      ...(userName && { userName }),
      ...(userPhoneNumber && { userPhoneNumber }),
      ...(userAddress && { userAddress }),
      ...(userAvatarUrl && { userAvatarUrl: userAvt }),
    };

    const updatedUser = await User.findOneAndUpdate(
      { userEmail },
      updateFields,
      {
        new: true,
      }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_PROFILE_SUCCESS,
      data: {
        ...updatedUser._doc,
      },
    };
  } catch (exception) {
    if (userAvt) {
      cloudinaryService.deleteImageFromCloudinary(userAvt);
    }
    return {
      success: false,
      message: exception.message,
    };
  }
};

const userUpdateRoleRepository = async ({ userId, newRole }) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: Exception.CANNOT_FIND_USER,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userRole: newRole },
      { new: true }
    ).exec();
    if (!updatedUser) {
      return {
        success: false,
        message: Exception.UPDATE_USER_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_ROLE_SUCCESS,
      data: {
        ...updatedUser.toObject(),
        userPassword: "Not shown",
      },
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
  userForgotPasswordRepository,
  userResetPasswordRepository,
  userChangePasswordRepository,
  userViewProfileRepository,
  userUpdateProfileRepository,
  userUpdateRoleRepository,
  userSearchRepository,
};
