import { HttpStatusCode } from "axios";
import Cart from "../model/cartModel.js";
import Order from "../model/orderModel.js";

const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findOne({ user: data.user }).populate(
        "products.product"
      );
      if (!cart) reject({ message: "cart is not define" });
      if (!cart.products || cart.products.length === 0) {
        reject({ message: "Not found product in cart" });
        return;
      }

      const products = cart.products.map((productItem) => {
        const product = productItem.product;

        if (productItem.quantity > product.quantity) {
          reject({
            status: HttpStatusCode.BadRequest,
            message: `Not enough quantity of ${product.name}`,
          });
          return;
        }

        return {
          product: product._id,
          price: product.price,
          quantity: productItem.quantity,
        };
      });

      const orderData = {
        ...data,
        total: cart.total,
        products,
      };

      const order = await Order.create(orderData);

      resolve({
        message: "Create order successfully",
        data: order,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getOrderByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({ user: id }).populate(
        "user products.product"
      );
      if (order === null) {
        reject({
          status: "ERR",
          message: `The order is not defined `,
        });
      }
      resolve({
        status: HttpStatusCode.Ok,
        message: "SUCCESS",
        data: order,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const changeStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(id).populate("user products.product");
      if (!order)
        reject({
          status: HttpStatusCode.NotFound,
          message: "Order not found",
        });
      order.status = status;
      const newOrder = await order.save();
      resolve({
        message: "Change status successfully",
        status: HttpStatusCode.Ok,
        data: newOrder,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find({}).populate("user products.product");
      const totalOrder = await Order.count();
      if (!allOrder.length)
        reject({
          status: HttpStatusCode.NotFound,
          message: "Orders not found",
        });

      resolve({
        message: "Get orders successfully",
        status: HttpStatusCode.Ok,
        data: allOrder,
        totalOrder: totalOrder,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default { create, getOrderByUserId, getAllOrder, changeStatus };
