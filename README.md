# Note Taking Application

A full-stack note-taking application built with React and Node.js, featuring user authentication, note management, and a responsive design.

## Features
1. **User Authentication**: 
   - Sign up using email and OTP flow.
   - Proper validation for all inputs.
   - Relevant error messages for incorrect inputs, OTP errors, or API failures.

2. **User Management**:
   - Display a welcome page after successful login or signup.
   - Show user information.

3. **Note Management**:
   - Create and delete notes.
   - Authorized actions using JWT.

4. **Responsive Design**:
   - Mobile-friendly interface closely replicating the provided design.
   - 
## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Redux Toolkit and RTK Query
- Tailwind CSS for styling
- Form validation libraries

### Backend
- Node.js with TypeScript
- Express.js framework
- JWT for authentication
- Input validation middleware

### Database
- MongoDB
- Mongoose

### Development Tools
- Git for version control
- ESLint for code linting
- Prettier for code formatting

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or later)
- npm or yarn
- Git
- MongoDB/MySQL/PostgreSQL

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ashu6200/note-taking-app.git
cd note-taking-app
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Create environment variables:

client (.env):
```
VITE_SERVER_URL=http://localhost:5000
```

Backend (.env):
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Running the Application

1. Start the backend server:
```bash
cd client
npm run dev
```

2. Start the frontend development server:
```bash
cd server
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/verify-otp` - OTP verification

### Notes
- `GET /notes/all` - Get all notes
- `POST /notes/add` - Create a new note
- `DELETE /notes/:id` - Delete a note

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── assest/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── helper/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── app.ts
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

## Development Workflow

1. Create a new branch for each feature:
```bash
git checkout -b feature/feature-name
```

2. Commit your changes:
```bash
git add .
git commit -m "Description of changes"
```

3. Push to the repository:
```bash
git push origin feature/feature-name
```

## Deployment

The application is deployed at: [Your-Deployed-URL]

### Deployment Steps

1. Build the frontend:
```bash
cd client
npm run build
```

2. Build the backend:
```bash
cd server
npm run build
```

3. Deploy to your chosen cloud platform following their specific deployment guidelines.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
