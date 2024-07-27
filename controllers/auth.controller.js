import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/user.service.js';

// [POST] /auth/login
export const handleLogin = async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      const newUser = {
        personalInfo: user.personalInfo,
        preferences: user.preferences,
        healthInfo: user.healthInfo
      };
      const result = await service.createUser(newUser);
    }
    const { code, data } = await service.getUserByEmail(req.body.email);
    return res.status(code).json({
      data
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
