import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { USERS_MESSAGES } from '../constants/messages.js';

// [GET] users
export const getUsers = async () => {
  const users = await getDocs(collection(dbFirebase, 'users'));
  const userArray = [];

  if (users.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: USERS_MESSAGES.NO_USERS_FOUND
    };
  } else {
    users.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      userArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      userArray,
      message: USERS_MESSAGES.GET_USERS_SUCCESS
    };
  }
};

// [GET] users/:id
export const getUser = async (id) => {
  const users = doc(dbFirebase, 'users', id);
  const data = await getDoc(users);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: data.data(),
      message: USERS_MESSAGES.GET_DETAIL_USERS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: USERS_MESSAGES.NO_USERS_FOUND
    };
  }
};

// [POST] users/create
export const createUser = async (user) => {
  await addDoc(collection(dbFirebase, 'users'), user);
  return {
    code: HTTP_STATUS.CREATED,
    message: USERS_MESSAGES.USERS_CREATED_SUCCESSFULLY
  };
};

// [PATCH] users/update/:id
export const updateUser = async (id, data) => {
  const user = doc(dbFirebase, 'users', id);
  await updateDoc(user, data);
  return {
    code: HTTP_STATUS.OK,
    message: USERS_MESSAGES.USERS_UPDATED_SUCCESSFULLY
  };
};

// [DELETE] users/delete/:id
export const deleteUser = async (id) => {
  await deleteDoc(doc(dbFirebase, 'users', id));
  return {
    code: HTTP_STATUS.OK,
    message: USERS_MESSAGES.USERS_DELETED_SUCCESSFULLY
  };
};
