import {Discount} from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";

const getAllDiscountRepository = async () => {
  try {
    const allDiscounts = await Discount.find({});
    if (!allDiscounts) {
      return {
        success: false,
        message: Exception.DISCOUNT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_ALL_DISCOUNT_SUCCESS,
      data: allDiscounts,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getDiscountByIdRepository = async (id) => {
  const getDiscountById = await Discount.findById(id);
  try {
    if (!getDiscountById) {
      return {
        success: false,
        message: Exception.DISCOUNT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_DISCOUNT_BY_ID_SUCCESS,
      data: getDiscountById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const createDiscountRepository = async (
  code,
  name,
  percent,
  startTime,
  expireTime,
  products
) => {
  try {
    const getDiscountByName = await Discount.findOne({ name }).exec();
    if (getDiscountByName) {
      return {
        success: false,
        message: Exception.DISCOUNT_EXIST,
      };
    }

    const newDiscount = await Discount.create({
      code,
      name,
      percent,
      startTime,
      expireTime,
      products,
    });
    if (!newDiscount) {
      return {
        success: false,
        message: Exception.CREATE_DISCOUNT_ERROR,
      };
    }
    return {
      success: true,
      message: SuccessConstants.CREATE_DISCOUNT_SUCCESS,
      data: newDiscount,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const updatedDiscountByIdRepository = async (
  code,
  name,
  percent,
  startTime,
  expireTime,
  products
) => {
  try {
    const existingDiscount = Discount.findById(id);
    if (!existingDiscount) {
      return {
        success: false,
        message: Exception.DISCOUNT_NOT_FOUND,
      };
    }

    const updateFields = {
      ...(code && { code }),
      ...(percent && { percent }),
      ...(name && { name }),
      ...(startTime && { startTime }),
      ...(expireTime && { expireTime }),
      ...(products && { products }),
    };

    const updatedDiscountById = await Discount.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
    ).exec();

    if (!updatedDiscountById) {
      return {
        success: false,
        message: Exception.UPDATE_DISCOUNT_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_DISCOUNT_SUCCESS,
      data: updatedDiscountById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const deleteDiscountByIdRepository = async (id) => {
  try {
    const existingDiscount = Discount.findById(id);
    if (!existingDiscount) {
      return {
        success: false,
        message: Exception.DISCOUNT_NOT_FOUND,
      };
    }

    const deleteDiscountById = await Discount.findByIdAndRemove(id, {
      new: true,
    }).exec();
    if (!deleteDiscountById) {
      return {
        success: false,
        message: Exception.DELETE_DISCOUNT_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.DELETE_DISCOUNT_SUCCESS,
      data: deleteDiscountById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  getAllDiscountRepository,
  getDiscountByIdRepository,
  createDiscountRepository,
  updatedDiscountByIdRepository,
  deleteDiscountByIdRepository
};
