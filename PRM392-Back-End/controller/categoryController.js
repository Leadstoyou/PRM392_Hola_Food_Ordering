import { categoryRepository } from "../repository/indexRepository.js";
import { HttpStatusCode } from "axios";

const getAllCategoriesController = async (req,res) => {
  try {
    const allCategories = await categoryRepository.getAllCategoriesRepository();
    if (!allCategories.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: allCategories.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: allCategories.message,
      data: allCategories.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const getCategoryByIdController = async (req,res) => {
  const {id } = req.query;
  try {
    const getCategoryById = await categoryRepository.getCategoryByIdRepository(
      id
    );
    if (!getCategoryById.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: getCategoryById.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: getCategoryById.message,
      data: getCategoryById.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const createCategoryController = async (req,res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await categoryRepository.createCategoryRepository(
      name,
      description
    );
    if (!newCategory.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: newCategory.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: newCategory.message,
      data: newCategory.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const updatedCategoryByIdController = async (req,res) => {
  const {id, name, description } = req.body;
  try {
    const updateCategory =
      await categoryRepository.updatedCategoryByIdRepository(
        id,
        name,
        description
      );
    if (!updateCategory.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: updateCategory.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: updateCategory.message,
      data: updateCategory.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const deleteCategoryByIdController = async (req,res) => {
  const {id } = req.body;
    try {
      const deleteCategory =
        await categoryRepository.updatedCategoryByIdRepository(
          id
        );
      if (!deleteCategory.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: deleteCategory.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: deleteCategory.message,
        data: deleteCategory.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
  };

export default {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updatedCategoryByIdController,
  deleteCategoryByIdController
};
