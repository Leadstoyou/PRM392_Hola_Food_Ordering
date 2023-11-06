import { Category } from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
const getAllCategoriesRepository = async () => {
  try {
    const allCategories = await Category.find({});
    if (!allCategories) {
      return {
        success: false,
        message: Exception.CATEGORY_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_ALL_CATEGORY_SUCCESS,
      data: allCategories,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getCategoryByIdRepository = async (id) => {
  const getCategoryById = await Category.findById(id);
  try {
    if (!getCategoryById) {
      return {
        success: false,
        message: Exception.CATEGORY_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_CATEGORY_BY_ID_SUCCESS,
      data: getCategoryById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const createCategoryRepository = async (name, description) => {
  try {
    const getCategoryByName = await Category.findOne({ name }).exec();
    if (getCategoryByName) {
      return {
        success: false,
        message: Exception.CATEGORY_EXIST,
      };
    }

    const newCategory = await Category.create({ name, description });
    if (!newCategory) {
      return {
        success: false,
        message: Exception.CREATE_CATEGORY_ERROR,
      };
    }
    return {
      success: true,
      message: SuccessConstants.CREATE_CATEGORY_SUCCESS,
      data: newCategory,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const updatedCategoryByIdRepository = async (id, name, description) => {
  try {
    const existingCategory = Category.findById(id);
    if (!existingCategory) {
      return {
        success: false,
        message: Exception.CATEGORY_NOT_FOUND,
      };
    }

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
    };

    const updatedCategoryById = await Category.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
    ).exec();

    if (!updatedCategoryById) {
      return {
        success: false,
        message: Exception.UPDATE_CATEGORY_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.UPDATE_CATEGORY_SUCCESS,
      data: updatedCategoryById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const deleteCategoryByIdRepository = async (id) => {
  try {
    const existingCategory = Category.findById(id);
    if (!existingCategory) {
      return {
        success: false,
        message: Exception.CATEGORY_NOT_FOUND,
      };
    }

    const deleteCategoryById = await Category.findByIdAndRemove(id, {
      new: true,
    }).exec();
    if (!deleteCategoryById) {
      return {
        success: false,
        message: Exception.DELETE_CATEGORY_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.DELETE_CATEGORY_SUCCESS,
      data: deleteCategoryById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  getAllCategoriesRepository,
  getCategoryByIdRepository,
  createCategoryRepository,
  updatedCategoryByIdRepository,
  deleteCategoryByIdRepository,
};
