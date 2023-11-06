// import Product from "../model/productModel.js";
import productRepository from "../repository/productRepository.js";
import { HttpStatusCode } from "axios";
const createProduct = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array(),
    //   });
    // }
    const response = await productRepository.createProduct(req.body);
    return res.status(200).json({
      response: HttpStatusCode.Ok,
      msg: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};


const getAllProduct = async (req, res) => {
  try {
    const response = await productRepository.getAllProduct(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     errors: errors.array(),
    //   });
    // }
    const response = await productRepository.updateProduct(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};
const getDetailProduct = async (req, res) => {
  try {
    const response = await productRepository.getDetailProduct(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await productRepository.deleteProduct(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

export default {
  createProduct,
  getAllProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  updateProduct,
};
