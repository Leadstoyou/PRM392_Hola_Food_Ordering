import mongoose, { Schema } from "mongoose";

const Discount = mongoose.model(
  "Discount",
  new Schema({
    code: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    expireTime: {
      type: Date,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
    ],
  })
);
export default Discount;
