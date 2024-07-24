import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import HTTP_STATUS from '../constants/httpStatus.js';
import { REVIEWS_MESSAGES } from '../constants/messages.js';

// [GET] reviews
export const getReviews = async () => {
  const reviews = await getDocs(collection(dbFirebase, 'reviews'));
  const reviewArray = [];

  if (reviews.empty) {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: REVIEWS_MESSAGES.NO_REVIEWS_FOUND
    };
  } else {
    reviews.forEach((doc) => {
      const obj = { ...doc.data(), id: doc.id };
      reviewArray.push(obj);
    });

    return {
      code: HTTP_STATUS.OK,
      reviewArray,
      message: REVIEWS_MESSAGES.GET_REVIEWS_SUCCESS
    };
  }
};
// [GET] reviews/:id
export const getReview = async (id) => {
  const reviews = doc(dbFirebase, 'reviews', id);
  const data = await getDoc(reviews);
  if (data.exists()) {
    return {
      code: HTTP_STATUS.OK,
      data: data.data(),
      message: REVIEWS_MESSAGES.GET_DETAIL_REVIEWS_SUCCESS
    };
  } else {
    return {
      code: HTTP_STATUS.NOT_FOUND,
      message: REVIEWS_MESSAGES.NO_REVIEWS_FOUND
    };
  }
};

// [POST] reviews/create
export const createReview = async (review) => {
  await addDoc(collection(dbFirebase, 'reviews'), review);
  return {
    code: HTTP_STATUS.CREATED,
    message: REVIEWS_MESSAGES.REVIEWS_CREATED_SUCCESSFULLY
  };
};

// [PATCH] reviews/update/:id
export const updateReview = async (id, data) => {
  const review = doc(dbFirebase, 'reviews', id);
  await updateDoc(review, data);
  return {
    code: HTTP_STATUS.OK,
    message: REVIEWS_MESSAGES.REVIEWS_UPDATED_SUCCESSFULLY
  };
};

// [DELETE] reviews/delete/:id
export const deleteReview = async (id) => {
  await deleteDoc(doc(dbFirebase, 'reviews', id));
  return {
    code: HTTP_STATUS.OK,
    message: REVIEWS_MESSAGES.REVIEWS_DELETED_SUCCESSFULLY
  };
};
