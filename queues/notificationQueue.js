import amqp from 'amqplib';

let channel = null;

const connect = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('notifications', { durable: true });
  await channel.assertQueue('notifications_retry', { durable: true });
};

export const publishToQueue = async (message) => {
  if (!channel) await connect();
  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(message)), {
    persistent: true
  });
};
