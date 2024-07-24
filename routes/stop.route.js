import express from 'express';

import * as controller from '../controllers/stop.controller.js';

const router = express.Router();

router.get('/', controller.getStops);

router.get('/:id', controller.getStop);

router.post('/create', controller.createStop);

router.patch('/update/:id', controller.updateStop);

router.delete('/delete/:id', controller.deleteStop);

export default router;
