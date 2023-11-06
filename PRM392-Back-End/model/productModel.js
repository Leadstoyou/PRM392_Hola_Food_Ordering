import mongoose, { Schema } from "mongoose";

const Product = mongoose.model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      images: [
        {
          type: Schema.Types.ObjectId,
          ref: "Image",
        },
      ],
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    { timestamps: true }
  )
);
export default Product;
