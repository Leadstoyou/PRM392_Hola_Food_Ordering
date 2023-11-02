import { discountRepository } from "../repository/indexRepository.js";
import { HttpStatusCode } from "axios";

const getAllDiscountController = async (req, res) => {
  try {
    const allDiscounts = await discountRepository.getAllDiscountRepository();
    if (!allDiscounts.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: allDiscounts.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: allDiscounts.message,
      data: allDiscounts.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const getDiscountByIdController = async (req, res) => {
  const { id } = req.query;
  try {
    const getDiscountById = await discountRepository.getDiscountByIdRepository(
      id
    );
    if (!getDiscountById.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: getDiscountById.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: getDiscountById.message,
      data: getDiscountById.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const createDiscountController = async (req, res) => {
  const { code, name, percent, startTime, expireTime, products } = req.body;
  try {
    const newDiscount = await discountRepository.createDiscountRepository(
      code,
      name,
      percent,
      startTime,
      expireTime,
      products
    );
    if (!newDiscount.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: newDiscount.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: newDiscount.message,
      data: newDiscount.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const updatedDiscountByIdController = async (req, res) => {
  const { code, name, percent, startTime, expireTime, products } = req.body;
  try {
    const updateDiscount =
      await discountRepository.updatedDiscountByIdRepository(
        code,
        name,
        percent,
        startTime,
        expireTime,
        products
      );
    if (!updateDiscount.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: updateDiscount.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: updateDiscount.message,
      data: updateDiscount.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const deleteDiscountByIdController = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteDiscount =
      await discountRepository.deleteDiscountByIdRepository(id);
    if (!deleteDiscount.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: deleteDiscount.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: deleteDiscount.message,
      data: deleteDiscount.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

export default {
  getAllDiscountController,
  getDiscountByIdController,
  createDiscountController,
  updatedDiscountByIdController,
  deleteDiscountByIdController,
};
