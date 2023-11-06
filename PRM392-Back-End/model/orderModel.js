import mongoose, { Schema } from "mongoose";
import ConfigConstants from "../constant/ConfigConstants.js";

const Order = mongoose.model(
  "Order",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      Note: String,
      cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
      product:[
        
      ],
      status: {
        type: String,
        required: true,
        default: ConfigConstants.ORDER_STATUS.processing,
      },
      paymentType: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
export default Order;
