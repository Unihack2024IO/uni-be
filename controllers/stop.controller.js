import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import Stop from '../models/stop.model.js';

// [GET] stops
export const getStops = async (req, res) => {
  try {
    const stops = await getDocs(collection(dbFirebase, 'stops'));
    const stopArray = [];

    if (stops.empty) {
      res.status(400).json({
        message: 'No Stops Found'
      });
    } else {
      stops.forEach((doc) => {
        stopArray.push(doc.data());
      });

      res.status(200).json({
        stopArray
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] stops/:id
export const getStop = async (req, res) => {
  try {
    const id = req.params.id;
    const stops = doc(dbFirebase, 'stops', id);
    const data = await getDoc(stops);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: 'Stop Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [POST] stops/create
export const createStop = async (req, res) => {
  try {
    const data = req.body;
    const stop = new Stop({
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
    await addDoc(collection(dbFirebase, 'stops'), stop);
    res.status(200).json({
      message: 'Stop created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] stops/update/:id
export const updateStop = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const stop = doc(dbFirebase, 'stops', id);
    await updateDoc(stop, data);
    res.status(200).json({
      message: 'Stop updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [DELETE] stops/delete/:id
export const deleteDestination = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(dbFirebase, 'stops', id));
    res.status(200).json({
      message: 'Stop deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
