import Notification from '../models/notification.model.js';

export const createInAppNotification = async ({ userId, message }) => {
  await Notification.create({
    userId,
    type: 'in-app',
    message,
    status: 'sent'
  });
  
  // Add WebSocket/real-time implementation here
};
