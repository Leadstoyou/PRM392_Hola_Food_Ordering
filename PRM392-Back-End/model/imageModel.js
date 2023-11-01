import mongoose, { Schema } from "mongoose";

const Image = mongoose.model(
  "Image",
  new Schema({
    url: {
      type: String,
      required: true,
    },
  })
);
export default Image;
