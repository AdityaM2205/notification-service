import express from 'express';
import {
  sendNotification,
  getUserNotifications
} from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/notifications', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

export default router;
