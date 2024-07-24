import { dbFirebase } from '../config/firebase.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import Review from '../models/review.model.js';

// [GET] reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await getDocs(collection(dbFirebase, 'reviews'));
    const reviewArray = [];

    if (reviews.empty) {
      res.status(400).json({
        message: 'No Reviews Found'
      });
    } else {
      reviews.forEach((doc) => {
        reviewArray.push(doc.data());
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
    const reviews = doc(dbFirebase, 'reviews', id);
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
    const review = new Review({
      name: data.name,
      userId: data.userId,
      comment: data.comment,
      destinationId: data.destinationId,
      date: data.date,
      reviewImages: data.reviewImages
    });
    await addDoc(collection(dbFirebase, 'reviews'), review);
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
    const review = doc(dbFirebase, 'reviews', id);
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
    await deleteDoc(doc(dbFirebase, 'reviews', id));
    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
