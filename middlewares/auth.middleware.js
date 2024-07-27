import * as service from '../services/user.service.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import User from '../models/user.model.js';

// [POST] /auth/login
export const checkEmailValidate = async (req, res, next) => {
  const { code } = await service.getUserByEmail(req.body.email);
  if (code == HTTP_STATUS.NOT_FOUND) {
    const personalInfo = {
      address: {},
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      profilePicture: req.body.profilePicture
    };
    const healthInfo = {
      requirements: ['uống thuốc hàng ngày', 'kiểm tra sức khỏe định kỳ'],
      condition: ['huyết áp cao', 'dị ứng']
    };
    const preferences = {
      expectations: {
        expectations: ['phục vụ chuyên nghiệp', 'hướng dẫn viên tận tình'],
        experience: ['tham quan di tích lịch sử', 'trải nghiệm địa phương']
      },
      interests: ['đọc sách', 'đi du lịch', 'chơi đàn guitar'],
      preferredTravelStyle: ['thám hiểm', 'thư giãn'],
      preferredTravelTime: {
        end: '17:00',
        start: '09:00'
      },
      dislikes: ['nóng nực', 'không gian hẹp'],
      budget: 'hạn chế',
      specialRequirements: {
        services: ['dịch vụ vệ sinh', 'suất ăn chay'],
        accommodations: ['gần bệnh viện', 'có bãi đậu xe']
      },
      allergies: ['bụi', 'sữa'],
      colorPreferences: ['đỏ', 'vàng']
    };
    const user = new User({
      personalInfo,
      healthInfo,
      preferences
    });
    req.user = user;
  }
  next();
};
