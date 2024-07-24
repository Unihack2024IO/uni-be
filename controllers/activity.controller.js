import Activity from '../models/activity.model.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/activity.service.js';

// [GET] activities
export const getActivities = async (req, res) => {
  try {
    const result = await service.getActivities();
    const { code, activityArray, message } = result;
    return res.status(code).json({
      activityArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] activities/:id
export const getActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getActivity(id);
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

// [POST] activities/create
export const createActivity = async (req, res) => {
  try {
    const data = req.body;
    let activity = new Activity({
      destinationId: data.destinationId,
      name: data.name,
      time: data.time,
      description: data.description,
      type: data.type,
      imageUrl: data.imageUrl,
      entryFee: data.entryFee,
      activities: data.activities,
      contactInfo: {
        phone: data.contactInfo.phone,
        email: data.contactInfo.email
      }
    });
    activity = JSON.parse(JSON.stringify(activity));
    const result = await service.createActivity(activity);
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

// [PATCH] activities/update/:id
export const updateActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateActivity(id, data);
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

// [DELETE] activities/delete/:id
export const deleteActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteActivity(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
