import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { HISTORY_MESSAGES } from '../constants/messages.js';
import HTTP_STATUS from '../constants/httpStatus.js';

// [GET] history
export const getHistory = async () => {
  const travelHistory = await getDocs(collection(dbFirebase, 'travelHistory'));
  const travelHistoryArray = [];

  if (travelHistory.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: HISTORY_MESSAGES.NO_HISTORY_FOUND
    };
  } else {
    travelHistory.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      travelHistoryArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      travelHistoryArray,
      message: HISTORY_MESSAGES.GET_HISTORY_SUCCESS
    };
  }
};

// [GET] history/:id
export const getHistoryDetail = async (id) => {
  const history = doc(dbFirebase, 'travelHistory', id);
  const data = await getDoc(history);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: data.data(),
      message: HISTORY_MESSAGES.GET_DETAIL_HISTORY_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: HISTORY_MESSAGES.NO_HISTORY_FOUND
    };
  }
};

// [POST] history/create
export const createHistory = async (history) => {
  await addDoc(collection(dbFirebase, 'travelHistory'), history);
  return {
    code: HTTP_STATUS.CREATED,
    message: HISTORY_MESSAGES.HISTORY_CREATED_SUCCESSFULLY
  };
};

// [PATCH] history/update/:id
export const updateHistory = async (id, data) => {
  const history = doc(dbFirebase, 'travelHistory', id);
  await updateDoc(history, data);
  return {
    code: HTTP_STATUS.OK,
    message: HISTORY_MESSAGES.HISTORY_UPDATED_SUCCESSFULLY
  };
};

// [DELETE] history/delete/:id
export const deleteHistory = async (id) => {
  await deleteDoc(doc(dbFirebase, 'travelHistory', id));
  return {
    code: HTTP_STATUS.OK,
    message: HISTORY_MESSAGES.HISTORY_DELETED_SUCCESSFULLY
  };
};
