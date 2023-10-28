import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";
import ConfigConstants from "../constant/ConfigConstants.js";
const UserSchema = mongoose.Schema(
  {
    id: { type: ObjectId },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
    },
    userAddress: {
      type: String,
    },
    userPhoneNumber: {
      type: String,
    },
    userAvatarUrl: {
      type: String,
      required: true,
      default: "https://res.cloudinary.com/dotknkcep/image/upload/v1698478626/Constants/OIP_15_veecvf.jpg",
      validate: {
        validator: validator.isURL,
        message: "Invalid URL for product image",
      },
    },
    isActived: {
      type: Boolean,
      default: true,
      required: true,
    },
    roleId: {
      type: Number,
      required: true,
      default:ConfigConstants.USER_ROLE_ID
    },
  },
  {
    timestamp: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
