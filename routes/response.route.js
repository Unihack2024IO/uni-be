import express from 'express';

import * as controller from '../controllers/response.controller.js';

const router = express.Router();

router.get('/users/:id', controller.getInfoUser);

router.get('/destinations/:id', controller.getInfoDestination);

router.get('/activities', controller.getInfoActivities);

export default router;
