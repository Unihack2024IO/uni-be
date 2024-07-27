import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { DESTINATIONS_MESSAGES } from '../constants/messages.js';

// [GET] destinations
export const getDestinations = async () => {
  const destinations = await getDocs(collection(dbFirebase, 'destinations'));
  const destinationArray = [];

  if (destinations.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: DESTINATIONS_MESSAGES.NO_DESTINATIONS_FOUND
    };
  } else {
    destinations.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      destinationArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      destinationArray,
      message: DESTINATIONS_MESSAGES.GET_DESTINATIONS_SUCCESS
    };
  }
};

// [GET] destinations/:id
export const getDestination = async (id) => {
  const destinations = doc(dbFirebase, 'destinations', id);
  const data = await getDoc(destinations);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: {
        ...data.data(),
        id: data.id
      },
      message: DESTINATIONS_MESSAGES.GET_DETAIL_DESTINATIONS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: DESTINATIONS_MESSAGES.NO_DESTINATIONS_FOUND
    };
  }
};

// [POST] destinations/create
export const createDestination = async (destination) => {
  await addDoc(collection(dbFirebase, 'destinations'), destination);
  return {
    code: HTTP_STATUS.CREATED,
    message: DESTINATIONS_MESSAGES.DESTINATION_CREATED_SUCCESSFULLY
  };
};

// [PATCH] destinations/update/:id
export const updateDestination = async (id, data) => {
  const destination = doc(dbFirebase, 'destinations', id);
  await updateDoc(destination, data);
  return {
    code: HTTP_STATUS.OK,
    message: DESTINATIONS_MESSAGES.DESTINATION_UPDATED_SUCCESSFULLY
  };
};

// [DELETE] destinations/delete/:id
export const deleteDestination = async (id) => {
  await deleteDoc(doc(dbFirebase, 'destinations', id));
  return {
    code: HTTP_STATUS.OK,
    message: DESTINATIONS_MESSAGES.DESTINATION_DELETED_SUCCESSFULLY
  };
};


//ES6.
//node common js
