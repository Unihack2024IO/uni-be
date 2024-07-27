import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { RESPONSE_MESSAGES } from '../constants/messages.js';

// [GET] users/:id
export const getInfoUser = async (id) => {
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

    return {
      code: HTTP_STATUS.OK,
      user: userData,
      message: RESPONSE_MESSAGES.GET_USERS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.NO_USERS_FOUND
    };
  }
};

// [GET] destinations/:id
export const getInfoDestination = async (id) => {
  const destinations = doc(dbFirebase, 'destinations', id);
  const destination = await getDoc(destinations);
  if (destination.exists()) {
    const q = query(collection(dbFirebase, 'activities'), where('destinationId', '==', id));

    const activities = await getDocs(q);

    const activitiesArray = [];

    activities.forEach((doc) => {
      activitiesArray.push({
        id: doc.id,
        ...doc.data()
      });
    });

    const destinationData = destination.data();
    destinationData.activities = activitiesArray;

    return {
      code: HTTP_STATUS.OK,
      destination: destinationData,
      message: RESPONSE_MESSAGES.GET_DESTINATIONS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.NO_DESTINATIONS_FOUND
    };
  }
};
