import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { ACTIVITIES_MESSAGES } from '../constants/messages.js';

export const getActivities = async () => {
  const activities = await getDocs(collection(dbFirebase, 'activities'));
  const activityArray = [];

  if (activities.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: ACTIVITIES_MESSAGES.NO_ACTIVITIES_FOUND
    };
  } else {
    activities.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      activityArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      activityArray,
      message: ACTIVITIES_MESSAGES.GET_ACTIVITIES_SUCCESS
    };
  }
};

export const getActivity = async (id) => {
  const activities = doc(dbFirebase, 'activities', id);
  const data = await getDoc(activities);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: {
        ...data.data(),
        id: data.id
      },
      message: ACTIVITIES_MESSAGES.GET_DETAIL_ACTIVITIES_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: ACTIVITIES_MESSAGES.NO_ACTIVITIES_FOUND
    };
  }
};

export const createActivity = async (activity) => {
  await addDoc(collection(dbFirebase, 'activities'), activity);
  return {
    code: HTTP_STATUS.CREATED,
    message: ACTIVITIES_MESSAGES.ACTIVITY_CREATED_SUCCESSFULLY
  };
};

export const updateActivity = async (id, data) => {
  const activity = doc(dbFirebase, 'activities', id);
  await updateDoc(activity, data);
  return {
    code: HTTP_STATUS.OK,
    message: ACTIVITIES_MESSAGES.ACTIVITY_UPDATED_SUCCESSFULLY
  };
};

export const deleteActivity = async (id) => {
  await deleteDoc(doc(dbFirebase, 'activities', id));
  return {
    code: HTTP_STATUS.OK,
    message: ACTIVITIES_MESSAGES.ACTIVITY_DELETED_SUCCESSFULLY
  };
};
