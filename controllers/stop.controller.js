import Stop from '../models/stop.model.js';
import HTTP_STATUS from '../constants/httpStatus.js';
import * as service from '../services/stop.service.js';

// [GET] stops
export const getStops = async (req, res) => {
  try {
    const result = await service.getStops();
    const { code, stopArray, message } = result;
    return res.status(code).json({
      stopArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] stops/:id
export const getStop = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getStop(id);
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

// [POST] stops/create
export const createStop = async (req, res) => {
  try {
    const data = req.body;
    let stop = new Stop({
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      website: data.website,
      type: data.type,
      description: data.description,
      rating: data.rating,
      reviews: data.reviews,
      priceRange: data.priceRange,
      services: data.services,
      images: data.images,
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude
      },
      openingHours: data.openingHours
    });
    stop = JSON.parse(JSON.stringify(stop));
    const result = await service.createStop(stop);
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

// [PATCH] stops/update/:id
export const updateStop = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateStop(id, data);
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

// [DELETE] stops/delete/:id
export const deleteStop = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteStop(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
