import Exception from "../constant/Exception.js";
import { Cart } from "../model/indexModel.js";
import { productRepository } from "./indexRepository.js";

const addToCart = async ({ userId, productId, updateType }) => {
  try {
    const isUserHaveCart = await Cart.findOne({ user: userId });
    if (!isUserHaveCart) {
      const product = (await productRepository.getDetailProduct(productId)).data;
      const newCart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            quantity: 1,
          },
        ],
        total: product.price,
      });

      await newCart.save();
    } else {
      const productToUpdate = isUserHaveCart.products.find(
        (product) => product.product.toString() === productId
      );
      console.log("🚀 ~ file: cartRepository.js:26 ~ addToCart ~ productToUpdate:", productToUpdate)
      if (updateType === "minus" || updateType === "plus") {
        if (productToUpdate) {
          const product = (await productRepository.getDetailProduct(productId)).data;

          if (updateType === "minus" && productToUpdate.quantity > 0) {
            productToUpdate.quantity--;
            isUserHaveCart.total -= product.price;
          } else if (updateType === "plus") {
            productToUpdate.quantity++;
            isUserHaveCart.total += product.price;
          }
        } else {
          const product = (await productRepository.getDetailProduct(productId)).data;
          isUserHaveCart.products.push({
            product:productId,
            quantity:1
          });
          isUserHaveCart.total += product.price;
          await isUserHaveCart.save();
        }
      } else if (updateType === "delete") {
        const product = (await productRepository.getDetailProduct(productId)).data;
        const priceToMinus = productToUpdate.quantity * product.price;
        console.log("🚀 ~ file: cartRepository.js:41 ~ addToCart ~ priceToMinus:", priceToMinus)
        isUserHaveCart.products = isUserHaveCart.products.filter(
          (product) => product.product.toString() !== productId
        );
        isUserHaveCart.total -= priceToMinus;
      }

      await isUserHaveCart.save();
    }
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default { addToCart };
