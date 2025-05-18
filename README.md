Notification Service
A backend service to send notifications (Email, SMS, and In-App) to users, featuring queue-based processing and retry logic.

🚀 Features
API Endpoints

POST /notifications – Send a notification to a user

GET /users/:id/notifications – Retrieve notifications for a user

Notification Types

Email

SMS

In-app (stored in database)

Queue-based Processing

Uses RabbitMQ for asynchronous notification delivery

Retries failed notifications up to 3 times

🛠️ Technologies Used
Node.js (ES Modules)

Express.js

MongoDB (with Mongoose)

RabbitMQ (via amqplib)

Nodemailer (for email)

Twilio (for SMS)

Docker & Docker Compose

📦 Setup Instructions
1. Clone the Repository
bash
git clone https://github.com/AdityaM2205/notification-service.git
cd notification-service
2. Install Dependencies
bash
npm install
3. Environment Variables
Copy .env.example to .env:

bash
cp .env.example .env
Fill in your credentials in .env (do not commit real secrets).

4. Start Supporting Services (RabbitMQ & MongoDB)
Using Docker Compose:

bash
docker compose up -d rabbitmq mongodb
If you get a command not found error, make sure Docker Desktop is installed and use docker compose (with a space).

5. Start the Application
Start the API server:

bash
npm run dev
In a separate terminal, start the worker:

bash
npm run worker
📝 API Documentation
Send Notification
POST /notifications

json
{
  "userId": "user123",
  "type": "email", // or "sms" or "in-app"
  "message": "Hello, this is a test notification!"
}
Get User Notifications
GET /users/:id/notifications

🧩 Folder Structure
text
notification-service/
├── controllers/
├── models/
├── queues/
├── routes/
├── services/
├── workers/
├── app.js
├── server.js
├── .env.example
├── package.json
├── docker-compose.yml
└── README.md
⚠️ Security & Credentials
Never commit your real .env file or credentials.

Only submit .env.example with placeholder values.

🗒️ Assumptions
User email and phone number are hardcoded for demo purposes. In production, fetch from your user database.

In-app notifications are stored in MongoDB and can be extended to real-time delivery (e.g., via WebSockets).

The retry mechanism is basic and can be enhanced with exponential backoff or dead-letter queues.

🏁 Bonus
Queue-based processing for scalability.

Retry logic for failed notifications.

📞 Contact
For questions or suggestions, please open an issue or contact [adityamohanty012@gmail.com].

