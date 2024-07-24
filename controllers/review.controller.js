import Review from '../models/review.model.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/review.service.js';

// [GET] reviews
export const getReviews = async (req, res) => {
  try {
    const result = await service.getReviews();
    const { code, reviewArray, message } = result;
    return res.status(code).json({
      reviewArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] reviews/:id
export const getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getReview(id);
    const { code, data, message } = result;
    return res.status(code).json({
      data,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [POST] reviews/create
export const createReview = async (req, res) => {
  try {
    const data = req.body;
    let review = new Review({
      name: data.name,
      userId: data.userId,
      comment: data.comment,
      destinationId: data.destinationId,
      date: data.date,
      reviewImages: data.reviewImages
    });
    review = JSON.parse(JSON.stringify(review));
    const result = await service.createReview(review);
    const { code, message } = result;
    return res.status(code).json({
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [PATCH] reviews/update/:id
export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateReview(id, data);
    const { code, message } = result;
    return res.status(code).json({
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [DELETE] reviews/delete/:id
export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteReview(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
