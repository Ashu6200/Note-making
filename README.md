Note-Taking Application

This is a full-stack note-taking application built using modern technologies. The app allows users to sign up via email and OTP, manage their personal notes (create and delete), and access their account securely using JWT authorization.

Features

User Authentication

Signup using email and OTP.

Input validation for all fields.

Clear error messages for invalid inputs, OTP errors, or API failures.

User Dashboard

Welcome page displaying user information.

Ability to create and delete notes.

Responsive Design

Mobile-friendly layout closely replicating the provided design.

Security

JWT-based authorization for secure access to note-related actions.

Technology Stack

Frontend: ReactJS (TypeScript)

Backend: Node.js with a framework (TypeScript)

Database: MongoDB, MySQL, or PostgreSQL

Version Control: Git

Project Setup

Prerequisites

Ensure you have the following installed:

Node.js (latest stable version)

npm or yarn

MongoDB, MySQL, or PostgreSQL

Git

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install
# or
yarn install

Create a .env file in the backend directory with the following variables:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
OTP_SERVICE_API_KEY=your_otp_service_key

Run database migrations if required:

npm run migrate
# or
yarn migrate

Start the backend server:

npm run start
# or
yarn start

Deployment

Deploy the backend to a cloud platform (e.g., AWS, Heroku, or Vercel).

Deploy the frontend to a cloud platform (e.g., Netlify or Vercel).

Ensure the backend URL is correctly configured in the frontend config file.

Testing

Run tests for both the frontend and backend:

Frontend:

npm test
# or
yarn test

Backend:

npm test
# or
yarn test

Git Workflow

Clone the repository:

git clone <repository-url>

Commit your work after completing each feature:

git add .
git commit -m "<feature or fix description>"
git push

Deployment URL

Access the deployed application here: Deployed Application URL

Additional Notes

Assets: Download the required assets from this link.

Ensure all validations and error handling align with the requirements.

For any queries or issues, open a GitHub issue in this repository.

License

This project is licensed under the MIT License. See the LICENSE file for details.

