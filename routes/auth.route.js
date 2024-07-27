import express from 'express';

import * as controller from '../controllers/auth.controller.js';
import * as middleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', middleware.checkEmailValidate, controller.handleLogin);

export default router;
