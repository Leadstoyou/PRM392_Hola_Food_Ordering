import mongoose, { Schema } from "mongoose";

const Cart = mongoose.model(
  "Cart",
  new Schema({
    token: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },{
    timestamps:true,
  })
);
export default Cart;
