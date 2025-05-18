// workers/notification.worker.js
import amqp from 'amqplib';
import { sendEmail } from '../services/emailService.js';
import { sendSMS } from '../services/smsService.js';
import { createInAppNotification } from '../services/inAppService.js';


const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 5000; // 5 seconds

const processNotification = async (channel, msg) => {
  try {
    const notification = JSON.parse(msg.content.toString());
    
    switch (notification.type) {
      case 'email':
        await sendEmail(notification);
        break;
      case 'sms':
        await sendSMS(notification);
        break;
      case 'in-app':
        await createInAppNotification(notification);
        break;
    }

    channel.ack(msg);
  } catch (error) {
    if (notification.attempt < MAX_ATTEMPTS) {
      channel.nack(msg, false, false);
      await republishWithRetry(channel, notification);
    } else {
      channel.ack(msg);
      await markAsFailed(notification);
    }
  }
};

const republishWithRetry = async (channel, notification) => {
  const retryNotification = {
    ...notification,
    attempt: notification.attempt + 1
  };
  
  await channel.sendToQueue(
    'notifications_retry',
    Buffer.from(JSON.stringify(retryNotification)),
    { headers: { 'x-delay': RETRY_DELAY } }
  );
};
