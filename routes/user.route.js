import express from 'express';

import * as controller from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

router.post('/create', controller.createUser);

router.patch('/update/:id', controller.updateUser);

router.delete('/delete/:id', controller.deleteUser);

export default router;
