import firebase from '../utils/firebase.js';
import Destination from '../models/destination.model.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// [GET] destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await getDocs(collection(db, 'destinations'));
    const destinationArray = [];

    if (destinations.empty) {
      res.status(400).json({
        message: 'No Destinations Found'
      });
    } else {
      destinations.forEach((doc) => {
        const destination = new Destination({
          name: doc.data().name,
          priceRange: doc.data().price,
          transportation: {
            modes: doc.data().transportation.modes,
            convenience: doc.data().transportation.convenience
          },
          attractions: doc.data().attractions,
          cuisine: doc.data().cuisine,
          recreationalActivities: doc.data().recreationalActivities,
          safetyAndSecurity: {
            status: doc.data().safetyAndSecurity.status,
            measures: doc.data().safetyAndSecurity.measures,
            advice: doc.data().safetyAndSecurity.advice
          },
          localCultureAndCustoms: {
            etiquette: doc.data().localCultureAndCustoms.etiquette,
            traditionalFestivals: doc.data().localCultureAndCustoms.traditionalFestivals,
            specialties: doc.data().localCultureAndCustoms.specialties
          },
          idealWeather: {
            averageTemperature: doc.data().idealWeather.averageTemperature,
            condition: doc.data().idealWeather.condition,
            humidity: doc.data().idealWeather.humidity,
            wind: doc.data().idealWeather.wind
          },
          location: {
            latitude: doc.data().location.latitude,
            longitude: doc.data().location.longitude
          },
          accommodations: doc.data().accommodations,
          popularTimes: doc.data().popularTimes,
          contactInfo: {
            touristOffice: doc.data().contactInfo.touristOffice,
            email: doc.data().contactInfo.email
          }
        });
        destinationArray.push(destination);
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
    const destinations = doc(db, 'destinations', id);
    const data = await getDoc(destinations);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: "Destination Not Found'"
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
    await addDoc(collection(db, 'destinations'), data);
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
    const destination = doc(db, 'destinations', id);
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
    await deleteDoc(doc(db, 'destinations', id));
    res.status(200).json({
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
