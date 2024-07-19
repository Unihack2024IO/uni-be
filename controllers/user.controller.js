import firebase from '../utils/firebase.js';
import Stop from '../models/stop.model.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// [GET] users
export const getUsers = async (req, res) => {
  try {
    const stops = await getDocs(collection(db, 'stops'));
    const stopArray = [];

    if (stops.empty) {
      res.status(400).json({
        message: 'No Stops Found'
      });
    } else {
      stops.forEach((doc) => {
        const stop = new Stop({
          name: doc.data().name,
          address: doc.data().address,
          phone: doc.data().phone,
          email: doc.data().email,
          website: doc.data().website,
          type: doc.data().type,
          description: doc.data().description,
          rating: doc.data().rating,
          reviews: doc.data().reviews,
          priceRange: doc.data().priceRange,
          services: doc.data().services,
          images: doc.data().images,
          location: {
            latitude: doc.data().location.latitude,
            longitude: doc.data().location.longitude
          },
          openingHours: doc.data().openingHours
        });
        stopArray.push(stop);
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

// [GET] users/:id
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const stops = doc(db, 'stops', id);
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

// [POST] users/create
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'users'), data);
    res.status(200).json({
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] users/update/:id
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const stop = doc(db, 'stops', id);
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

// [DELETE] users/delete/:id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'users', id));
    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
