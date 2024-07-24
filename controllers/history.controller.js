import TravelHistory from '../models/history.model.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/history.service.js';

// [GET] history
export const getHistory = async (req, res) => {
  try {
    const result = await service.getHistory();
    const { code, travelHistoryArray, message } = result;
    return res.status(code).json({
      travelHistoryArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] history/:id
export const getHistoryDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getHistoryDetail(id);
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

// [POST] history/create
export const createHistory = async (req, res) => {
  try {
    const data = req.body;
    let history = new TravelHistory({
      userId: data.userId,
      destination: data.destination,
      rating: data.rating,
      favoriteActivities: data.favoriteActivities,
      travelDates: {
        start: data.travelDates.start,
        end: data.travelDates.end
      },
      travelCompanions: data.travelCompanions
    });
    history = JSON.parse(JSON.stringify(history));
    const result = await service.createHistory(history);
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

// [PATCH] history/update/:id
export const updateHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateHistory(id, data);
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

// [DELETE] history/delete/:id
export const deleteHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteHistory(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
