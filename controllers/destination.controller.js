import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import Destination from '../models/destination.model.js';

// [GET] destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await getDocs(collection(dbFirebase, 'destinations'));
    const destinationArray = [];

    if (destinations.empty) {
      res.status(400).json({
        message: 'No Destinations Found'
      });
    } else {
      destinations.forEach((doc) => {
        destinationArray.push(doc.data());
      });

      res.status(200).json({
        destinationArray
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] destinations/:id
export const getDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const destinations = doc(dbFirebase, 'destinations', id);
    const data = await getDoc(destinations);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: 'Destination Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [POST] destinations/create
export const createDestination = async (req, res) => {
  try {
    const data = req.body;
    const destination = new Destination({
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
    await addDoc(collection(dbFirebase, 'destinations'), destination);
    res.status(200).json({
      message: 'Destination created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] destinations/update/:id
export const updateDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const destination = doc(dbFirebase, 'destinations', id);
    await updateDoc(destination, data);
    res.status(200).json({
      message: 'Destination updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [DELETE] destinations/delete/:id
export const deleteDestination = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(dbFirebase, 'destinations', id));
    res.status(200).json({
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
