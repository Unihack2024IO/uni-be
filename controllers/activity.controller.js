import firebase from '../utils/firebase.js';
import Activity from '../models/activity.model.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// [GET] activities
export const getActivities = async (req, res) => {
  try {
    const activities = await getDocs(collection(db, 'activities'));
    const activityArray = [];

    if (activities.empty) {
      res.status(400).json({
        message: 'No Activities Found'
      });
    } else {
      activities.forEach((doc) => {
        const activity = new Activity({
          destinationId: doc.data().destinationId,
          name: doc.data().name,
          timeStart: doc.data().timeStart,
          timeEnd: doc.data().timeEnd,
          dayOfWeek: doc.data().dayOfWeek,
          description: doc.data().description,
          type: doc.data().type,
          imageUrl: doc.data().imageUrl,
          entryFee: doc.data().entryFee,
          sponsors: doc.data().sponsors,
          activities: doc.data().activities,
          contactInfo: {
            phone: doc.data().contactInfo.phone,
            email: doc.data().contactInfo.email
          }
        });
        activityArray.push(activity);
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
    const activities = doc(db, 'activities', id);
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
    await addDoc(collection(db, 'activities'), data);
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
    const activity = doc(db, 'activities', id);
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
    await deleteDoc(doc(db, 'activities', id));
    res.status(200).json({
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
