import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import TravelHistory from '../models/history.model.js';

// [GET] history
export const getHistory = async (req, res) => {
  try {
    const travelHistory = await getDocs(collection(dbFirebase, 'travelHistory'));
    const travelHistoryArray = [];

    if (travelHistory.empty) {
      res.status(400).json({
        message: 'No Travel History Found'
      });
    } else {
      travelHistory.forEach((doc) => {
        travelHistoryArray.push(doc.data());
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
    const history = doc(dbFirebase, 'travelHistory', id);
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
    const history = new TravelHistory({
      userId: data.userId,
      destination: data.destination,
      rating: data.rating,
      favoriteActivities: data.favoriteActivities,
      travelDates: {
        start: data.travelDates.start,
        end: data.travelDates.end
      },
      travelCompanions: data.travelCompanions
    });
    await addDoc(collection(dbFirebase, 'travelHistory'), history);
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
    const history = doc(dbFirebase, 'travelHistory', id);
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
    await deleteDoc(doc(dbFirebase, 'travelHistory', id));
    res.status(200).json({
      message: 'Travel History deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
