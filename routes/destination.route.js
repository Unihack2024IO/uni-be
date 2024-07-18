import express from 'express';

import * as controller from '../controllers/destination.controller.js';

const router = express.Router();

router.get('/', controller.getDestinations);

router.get('/:id', controller.getDestination);

router.post('/create', controller.createDestination);

router.patch('/update/:id', controller.updateDestination);

router.delete('/delete/:id', controller.deleteDestination);

export default router;
