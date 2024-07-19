import TravelHistory from '../models/history.model.js';
import firebase from '../utils/firebase.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// [GET] history
export const getHistory = async (req, res) => {
  try {
    const travelHistory = await getDocs(collection(db, 'travelHistory'));
    const travelHistoryArray = [];

    if (travelHistory.empty) {
      res.status(400).json({
        message: 'No Travel History Found'
      });
    } else {
      travelHistory.forEach((doc) => {
        const history = new TravelHistory({
          userId: doc.data().userId,
          destination: doc.data().destination,
          rating: doc.data().rating,
          favoriteActivities: doc.data().favoriteActivities,
          travelDates: {
            start: doc.data().travelDates.start,
            end: doc.data().travelDates.end
          },
          travelCompanions: doc.data().travelCompanions
        });
        travelHistoryArray.push(history);
      });

      res.status(200).json({
        travelHistoryArray
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] history/:id
export const getHistoryDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const history = doc(db, 'travelHistory', id);
    const data = await getDoc(history);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: 'Travel History Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [POST] history/create
export const createHistory = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'travelHistory'), data);
    res.status(200).json({
      message: 'Travel History created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] history/update/:id
export const updateHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const history = doc(db, 'travelHistory', id);
    await updateDoc(history, data);
    res.status(200).json({
      message: 'Travel History updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [DELETE] history/delete/:id
export const deleteHistory = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'travelHistory', id));
    res.status(200).json({
      message: 'Travel History deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
