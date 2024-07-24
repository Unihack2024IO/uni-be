import HTTP_STATUS from '../constants/httpStatus.js';
import Destination from '../models/destination.model.js';
import * as service from '../services/destination.service.js';

// [GET] destinations
export const getDestinations = async (req, res) => {
  try {
    const result = await service.getDestinations();
    const { code, destinationArray, message } = result;
    return res.status(code).json({
      destinationArray,
      message
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};

// [GET] destinations/:id
export const getDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.getDestination(id);
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

// [POST] destinations/create
export const createDestination = async (req, res) => {
  try {
    const data = req.body;
    let destination = new Destination({
      name: data.name,
      priceRange: data.priceRange,
      transportation: {
        modes: data.transportation.modes,
        convenience: data.transportation.convenience
      },
      attractions: data.attractions,
      cuisine: data.cuisine,
      recreationalActivities: data.recreationalActivities,
      safetyAndSecurity: {
        status: data.safetyAndSecurity.status,
        measures: data.safetyAndSecurity.measures,
        advice: data.safetyAndSecurity.advice
      },
      localCultureAndCustoms: {
        etiquette: data.localCultureAndCustoms.etiquette,
        traditionalFestivals: data.localCultureAndCustoms.traditionalFestivals,
        specialties: data.localCultureAndCustoms.specialties
      },
      idealWeather: {
        averageTemperature: data.idealWeather.averageTemperature,
        condition: data.idealWeather.condition,
        humidity: data.idealWeather.humidity,
        wind: data.idealWeather.wind
      },
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude
      },
      accommodations: data.accommodations,
      popularTimes: data.popularTimes,
      contactInfo: {
        touristOffice: data.contactInfo.touristOffice,
        email: data.contactInfo.email
      }
    });
    destination = JSON.parse(JSON.stringify(destination));
    const result = await service.createDestination(destination);
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

// [PATCH] destinations/update/:id
export const updateDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await service.updateDestination(id, data);
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

// [DELETE] destinations/delete/:id
export const deleteDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await service.deleteDestination(id);
    const { code, message } = result;
    return res.status(code).json({ message });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: error.message
    });
  }
};
