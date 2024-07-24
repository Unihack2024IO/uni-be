import User from '../models/user.model.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/user.service.js';

// [GET] users
export const getUsers = async (req, res) => {
  try {
    const result = await service.getUsers();
    const { code, userArray, message } = result;
    return res.status(code).json({
      userArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] users/:id
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getUser(id);
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

// [POST] users/create
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    let user = new User({
      personalInfo: data.personalInfo,
      healthInfo: data.healthInfo,
      preferences: data.preferences
    });
    user = JSON.parse(JSON.stringify(user));
    const result = await service.createUser(user);
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

// [PATCH] users/update/:id
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateUser(id, data);
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

// [DELETE] users/delete/:id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteUser(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
