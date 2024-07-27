import express from 'express';

import * as controller from '../controllers/adviser.controller.js';

const router = express.Router();
router.get('/tour', controller.getTourAdvisers);
router.get('/', controller.getAdvisers);

export default router;