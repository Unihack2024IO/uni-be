import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { STOPS_MESSAGES } from '../constants/messages.js';

// [GET] stops
export const getStops = async () => {
  const stops = await getDocs(collection(dbFirebase, 'stops'));
  const stopArray = [];

  if (stops.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: STOPS_MESSAGES.NO_STOPS_FOUND
    };
  } else {
    stops.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      stopArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      stopArray,
      message: STOPS_MESSAGES.GET_STOPS_SUCCESS
    };
  }
};

// [GET] stops/:id
export const getStop = async (id) => {
  const stops = doc(dbFirebase, 'stops', id);
  const data = await getDoc(stops);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: data.data(),
      message: STOPS_MESSAGES.GET_DETAIL_STOPS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: STOPS_MESSAGES.NO_STOPS_FOUND
    };
  }
};

// [POST] stops/create
export const createStop = async (stop) => {
  await addDoc(collection(dbFirebase, 'stops'), stop);
  return {
    code: HTTP_STATUS.CREATED,
    message: STOPS_MESSAGES.STOPS_CREATED_SUCCESSFULLY
  };
};

// [PATCH] stops/update/:id
export const updateStop = async (id, data) => {
  const stop = doc(dbFirebase, 'stops', id);
  await updateDoc(stop, data);
  return {
    code: HTTP_STATUS.OK,
    message: STOPS_MESSAGES.STOPS_UPDATED_SUCCESSFULLY
  };
};

// [DELETE] stops/delete/:id
export const deleteStop = async (id) => {
  await deleteDoc(doc(dbFirebase, 'stops', id));
  return {
    code: HTTP_STATUS.OK,
    message: STOPS_MESSAGES.STOPS_DELETED_SUCCESSFULLY
  };
};
