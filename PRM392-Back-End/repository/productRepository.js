import { HttpStatusCode } from "axios";
import ConfigConstants from "../constant/ConfigConstants.js";
import Image from "../model/imageModel.js";
import Product from "../model/productModel.js";
import cloudinaryService from "../service/cloudinaryService.js";

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

      const newProduct = await new Product({ ...data, images: images }).save();
      resolve({
        message: "Product saved successfully",
        data: newProduct,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllProduct = ({ search = "", categoryId, sort }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const conditions = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
      let sortQuery = {};
      switch (sort) {
        case ConfigConstants.SORT.latest:
          sortQuery = { createdAt: -1 };
          break;
        case ConfigConstants.SORT.oldest:
          sortQuery = { createdAt: 1 };
          break;
        case ConfigConstants.SORT.popular:
          sortQuery = { updatedAt: -1 };
          break;
        default:
          break;
      }
      if (categoryId) {
        conditions.category = categoryId;
      }
      const searchQuery = search || categoryId ? conditions : null;
      const totalProduct = await Product.count(searchQuery);
      const allProduct = await Product.find(searchQuery)
        .populate("category images")
        .sort(sortQuery);
      if (!allProduct.length)
        reject({
          status: HttpStatusCode.NotFound,
          message: "Products not found",
        });

      resolve({
        message: "Get products successfully",
        status: HttpStatusCode.Ok,
        data: allProduct,
        totalProduct,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        reject({
          status: HttpStatusCode.NotFound,
          message: "Product is not existed",
        });
      }
      const newImages = [];
      const existingImages = [];
      data.images?.forEach((image) => {
        if (!image._id) {
          newImages.push(image);
        } else {
          existingImages.push(image);
        }
      });
      const uploadedImages = await Promise.all(
        newImages.map(async (image) => {
          const url = await cloudinaryService.uploadProductImageToCloudinary(
            image.url,
            ConfigConstants.CLOUDINARY_PRODUCT_IMG
          );
          if (!url) {
            reject({
              status: HttpStatusCode.BadRequest,
              message: "Lỗi khi tải lên ảnh mới lên Cloudinary",
            });
          }
          const newImage = await new Image({ url }).save();
          return newImage;
        })
      );

      const updatedImages = [...uploadedImages, ...existingImages];

      const updatedProductData = {
        ...data,
        images: updatedImages,
      };
      const newProduct = await Object.assign(
        existingProduct,
        updatedProductData
      ).save();
      resolve({
        status: HttpStatusCode.Ok,
        message: "SUCCESS",
        data: newProduct,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id).populate("images category");
      if (product === null) {
        resolve({
          status: "ERR",
          message: `The product is not defined `,
        });
      }
      resolve({
        status: HttpStatusCode.Ok,
        message: "SUCCESS",
        data: product,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.findByIdAndDelete(id);
      resolve({
        status: HttpStatusCode.Ok,
        messages: "Delete Successfully",
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  createProduct,
  getAllProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
};
