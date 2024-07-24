import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// [GET] users/:id
export const getInfoUser = async (req, res) => {
  try {
    const id = req.params.id;
    const users = doc(dbFirebase, 'users', id);
    const user = await getDoc(users);
    if (user.exists()) {
      const q = query(collection(dbFirebase, 'travelHistory'), where('userId', '==', id));
      const history = await getDocs(q);
      const travelHistory = [];

      history.forEach((doc) => {
        travelHistory.push(doc.data());
      });

      const userData = user.data();
      userData.travelHistory = travelHistory;

      res.status(200).json({
        user: userData
      });
    } else {
      res.status(404).json({
        message: 'User Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] destinations/:id
export const getInfoDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const destinations = doc(dbFirebase, 'destinations', id);
    const destination = await getDoc(destinations);
    if (destination.exists()) {
      const q = query(collection(dbFirebase, 'activities'), where('destinationId', '==', id));
      const activities = await getDocs(q);
      const activitiesArray = [];

      activities.forEach((doc) => {
        activitiesArray.push(doc.data());
      });

      const destinationData = destination.data();
      destinationData.activities = activitiesArray;

      res.status(200).json({
        destination: destinationData
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
