import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import Activity from '../models/activity.model.js';

// [GET] activities
export const getActivities = async (req, res) => {
  try {
    const activities = await getDocs(collection(dbFirebase, 'activities'));
    const activityArray = [];

    if (activities.empty) {
      res.status(400).json({
        message: 'No Activities Found'
      });
    } else {
      activities.forEach((doc) => {
        activityArray.push(data);
      });

      res.status(200).json({
        activityArray
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] activities/:id
export const getActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const activities = doc(dbFirebase, 'activities', id);
    const data = await getDoc(activities);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: 'Activity Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [POST] activities/create
export const createActivity = async (req, res) => {
  try {
    const data = req.body;
    const activity = new Activity({
      destinationId: data.destinationId,
      name: data.name,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
      dayOfWeek: data.dayOfWeek,
      description: data.description,
      type: data.type,
      imageUrl: data.imageUrl,
      entryFee: data.entryFee,
      sponsors: data.sponsors,
      activities: data.activities,
      contactInfo: {
        phone: data.contactInfo.phone,
        email: data.contactInfo.email
      }
    });
    await addDoc(collection(dbFirebase, 'activities'), activity);
    res.status(200).json({
      message: 'Activity created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] activities/update/:id
export const updateActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const activity = doc(dbFirebase, 'activities', id);
    await updateDoc(activity, data);
    res.status(200).json({
      message: 'Activity updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [DELETE] activities/delete/:id
export const deleteDestination = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(dbFirebase, 'activities', id));
    res.status(200).json({
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
