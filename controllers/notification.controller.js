// notification.controller.js
import { publishToQueue } from '../queues/notificationQueue';

export const sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    
    // Validate notification type
    const validTypes = ['email', 'sms', 'in-app'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid notification type' });
    }

    // Add to processing queue
    await publishToQueue({
      userId,
      type,
      message,
      attempt: 1
    });

    res.status(202).json({ message: 'Notification queued for processing' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue notification' });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id })
      .sort('-createdAt')
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};
