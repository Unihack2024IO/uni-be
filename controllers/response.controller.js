import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/response.service.js';

// [GET] users/:id
export const getInfoUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getInfoUser(id);
    const { code, user, message } = result;
    return res.status(code).json({
      user,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] destinations/:id
export const getInfoDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getInfoDestination(id);
    const { code, destination, message } = result;
    return res.status(code).json({
      destination,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
