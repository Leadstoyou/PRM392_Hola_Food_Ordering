import ConfigConstants from "../constant/ConfigConstants.js";
import Image from "../model/imageModel.js";
import Product from "../model/productModel.js";
import cloudinaryService from "../services/cloudinaryService.js";

const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const images = [];
      for (const image of data.images) {
        const url = await cloudinaryService.uploadProductImageToCloudinary(
          image.url,
          ConfigConstants.CLOUDINARY_PRODUCT_IMG
        );
        if (!url) reject(new Error("url not exist"));
        const newImage = await new Image({ url }).save();
        images.push(newImage);
      }

      console.log("images", images);
      const newProduct = await new Product({ ...data, images: images }).save();
      console.log("product", newProduct);
      resolve({
        message: "Product saved successfully",
        data: newProduct,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default { createProduct };
