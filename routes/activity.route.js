import express from 'express';

import * as controller from '../controllers/activity.controller.js';

const router = express.Router();

router.get('/', controller.getActivities);

router.get('/:id', controller.getActivity);

router.post('/create', controller.createActivity);

router.patch('/update/:id', controller.updateActivity);

router.delete('/delete/:id', controller.deleteDestination);

export default router;
