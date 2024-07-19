import express from 'express';

import * as controller from '../controllers/review.controller.js';

const router = express.Router();

router.get('/', controller.getReviews);

router.get('/:id', controller.getReview);

router.post('/create', controller.createReview);

router.patch('/update/:id', controller.updateReview);

router.delete('/delete/:id', controller.deleteReview);

export default router;
