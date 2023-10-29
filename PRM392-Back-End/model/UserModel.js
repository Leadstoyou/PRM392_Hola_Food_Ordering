import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";
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
      validate: {
        validator: validator.isURL,
        message: "Invalid URL for product image",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    roleId: {
      type: Number,
      required: true,
    },
    resetPasswordOTP: {
      type: String,
      require: false,
    },
  },
  {
    timestamp: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
