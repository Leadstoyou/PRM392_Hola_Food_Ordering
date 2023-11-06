import {feedbackRepository} from "../repository/indexRepository.js";
import { HttpStatusCode } from "axios";

const getAllFeedbackController = async (req,res) => {
  try {
    const allFeedback = await feedbackRepository.getAllFeedbackRepository();
    if (!allFeedback.success) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.BadRequest,
        message: allFeedback.message,
      });
    }
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.Ok,
      message: allFeedback.message,
      data: allFeedback.data,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.Ok).json({
      response: HttpStatusCode.InternalServerError,
      message: exception.message,
    });
  }
};

const getFeedbackByUserIdController = async (req,res) => {
    const {id } = req.query;
    try {
      const getFeedbackById = await feedbackRepository.getFeedbackByUserIdRepository(
        id
      );
      if (!getFeedbackById.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: getFeedbackById.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: getFeedbackById.message,
        data: getFeedbackById.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
};

const getFeedbackByProductIdController = async (req,res) => {
    const {id } = req.query;
    try {
      const getFeedbackById = await feedbackRepository.getFeedbackByProductIdRepository(
        id
      );
      if (!getFeedbackById.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: getFeedbackById.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: getFeedbackById.message,
        data: getFeedbackById.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
};

const createFeedbackByUserController = async (req,res) => {
    const { userId, productId,text } = req.body;
    try {
      const newFeedback = await feedbackRepository.createFeedbackByUserRepository(
        userId, productId,text
      );
      if (!newFeedback.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: newFeedback.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: newFeedback.message,
        data: newFeedback.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
};

const updatedFeedbackByUserController = async (req,res) => {
    const {id, text } = req.body;
    try {
      const updateFeedback =
        await feedbackRepository.updatedFeedbackByUserRepository(
          id,
          text
        );
      if (!updateFeedback.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: updateFeedback.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: updateFeedback.message,
        data: updateFeedback.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
};

const deleteFeedbackByUserController = async (req,res) => {
    const {id } = req.body;
    try {
      const deleteFeedback =
        await feedbackRepository.deleteFeedbackByUserRepository(
          id
        );
      if (!deleteFeedback.success) {
        return res.status(HttpStatusCode.Ok).json({
          response: HttpStatusCode.BadRequest,
          message: deleteFeedback.message,
        });
      }
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.Ok,
        message: deleteFeedback.message,
        data: deleteFeedback.data,
      });
    } catch (exception) {
      return res.status(HttpStatusCode.Ok).json({
        response: HttpStatusCode.InternalServerError,
        message: exception.message,
      });
    }
};

export default {
  getAllFeedbackController,
  getFeedbackByProductIdController,
  getFeedbackByUserIdController,
  createFeedbackByUserController,
  updatedFeedbackByUserController,
  deleteFeedbackByUserController,
};
