import Review from '../models/review.model.js';
import firebase from '../utils/firebase.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

// [GET] reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getDocs(collection(db, 'reviews'));
    const reviewArray = [];

    if (reviews.empty) {
      res.status(400).json({
        message: 'No Reviews Found'
      });
    } else {
      reviews.forEach((doc) => {
        const review = new Review({
          name: doc.data().name,
          userId: doc.data().userId,
          comment: doc.data().comment,
          destinationId: doc.data().destinationId,
          date: doc.data().date,
          reviewImages: doc.data().reviewImages
        });
        reviewArray.push(review);
      });

      res.status(200).json({
        reviewArray
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [GET] reviews/:id
export const getReview = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = doc(db, 'reviews', id);
    const data = await getDoc(reviews);
    if (data.exists()) {
      res.status(200).json({
        data: data.data()
      });
    } else {
      res.status(404).json({
        message: 'Review Not Found'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [POST] reviews/create
export const createReview = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'reviews'), data);
    res.status(200).json({
      message: 'Review created successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [PATCH] reviews/update/:id
export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const review = doc(db, 'reviews', id);
    await updateDoc(review, data);
    res.status(200).json({
      message: 'Review updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// [DELETE] reviews/delete/:id
export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'reviews', id));
    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
