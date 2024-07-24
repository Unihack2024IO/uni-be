import express from 'express';

import * as controller from '../controllers/history.controller.js';

const router = express.Router();

router.get('/', controller.getHistory);

router.get('/:id', controller.getHistoryDetail);

router.post('/create', controller.createHistory);

router.patch('/update/:id', controller.updateHistory);

router.delete('/delete/:id', controller.deleteHistory);

export default router;
