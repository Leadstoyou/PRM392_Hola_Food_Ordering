import mongoose, { Schema } from "mongoose";

const Category = mongoose.model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);
export default Category;
