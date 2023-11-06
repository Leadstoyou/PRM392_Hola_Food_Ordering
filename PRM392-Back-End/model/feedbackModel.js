import mongoose, { Schema } from "mongoose";

const Feedback = mongoose.model(
  "Feedback",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    text:{
      type: String,
      required: true,
    } ,
  })
);
export default Feedback;
