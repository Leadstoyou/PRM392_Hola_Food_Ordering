import { Feedback } from "../model/indexModel.js";
import Exception from "../constant/Exception.js";
import SuccessConstants from "../constant/SuccessConstants.js";
const getAllFeedbackRepository = async () => {
  try {
    const allFeedbacks = await Feedback.find({});
    if (!allFeedbacks) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_ALL_CATEGORY_SUCCESS,
      data: allFeedbacks,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getFeedbackByUserIdRepository = async (id) => {
  const getFeedbackById = await Feedback.findOne({ userId: id });
  try {
    if (!getFeedbackById) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_FEEDBACK_BY_USER_SUCCESS,
      data: getFeedbackById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getFeedbackByProductIdRepository = async (id) => {
  const getFeedbackById = await Feedback.findOne({ productId: id });
  try {
    if (!getFeedbackById) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND_ERROR,
      };
    }
    return {
      success: true,
      message: SuccessConstants.GET_FEEDBACK_BY_PRODUCT_SUCCESS,
      data: getFeedbackById,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const createFeedbackByUserRepository = async (userId, productId, text) => {
  try {
    const newFeedback = await Feedback.create({
      user: userId,
      product: productId,
      text,
    });
    if (!newFeedback.success) {
      return {
        success: false,
        message: Exception.CREATE_FEEDBACK_ERROR,
      };
    }
    return {
      success: true,
      message: SuccessConstants.CREATE_FEEDBACK_SUCCESS,
      data: newFeedback,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const updatedFeedbackByUserRepository = async (id, text) => {
  try {
    const existingFeedback = Feedback.findById({ userId: id });
    if (!existingFeedback) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND_ERROR,
      };
    }
    const updatedFeedbackByUserId = await Category.findByIdAndUpdate(
      { userId: id },
      text,
      {
        new: true,
      }
    ).exec();

    if (!updatedFeedbackByUserId) {
      return {
        success: false,
        message: Exception.UPDATE_FEEDBACK_ERROR,
      };
    }
    return {
      success: true,
      message: SuccessConstants.UPDATE_FEEDBACK_SUCCESS,
      data: updatedFeedbackByUserId,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const deleteFeedbackByUserRepository = async (id) => {
  try {
    const existingFeedback = Feedback.findById(id);
    if (!existingFeedback) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND_ERROR,
      };
    }

    const deleteFeedbackByUser = await Feedback.findByIdAndRemove(
      { userId: id },
      {
        new: true,
      }
    ).exec();
    if (!deleteFeedbackByUser) {
      return {
        success: false,
        message: Exception.DELETE_FEEDBACK_ERROR,
      };
    }

    return {
      success: true,
      message: SuccessConstants.DELETE_FEEDBACK_SUCCESS,
      data: deleteFeedbackByUser,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  getAllFeedbackRepository,
  getFeedbackByProductIdRepository,
  getFeedbackByUserIdRepository,
  createFeedbackByUserRepository,
  updatedFeedbackByUserRepository,
  deleteFeedbackByUserRepository,
};
