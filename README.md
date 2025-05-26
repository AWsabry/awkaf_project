# Awkaf Project

A full-stack web application for managing mosque projects, constructors, and related administrative tasks.

## Project Structure

### Backend (Node.js + Express + PostgreSQL)
- RESTful API built with Express.js
- PostgreSQL database with Sequelize ORM
- JWT authentication
- File upload handling
- Role-based access control (Admin/User)

#### Key Features
- User authentication and authorization
- Project management
- Constructor management
- Closed mosques tracking
- Blocked projects monitoring
- File uploads for project images

### Frontend (React)
- Modern UI with React
- Responsive design
- Protected routes
- Form validation
- File upload handling
- Data visualization

## Setup Instructions

### Backend Setup
1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
Create a `.env` file in the backend directory with:
```
DB_NAME=awkaf_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=8080
JWT_SECRET=your_secret_key
```

3. Start the server:
```bash
npm start
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Users
- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

### Projects
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Constructors
- GET /api/constructors
- POST /api/constructors
- PUT /api/constructors/:id
- DELETE /api/constructors/:id

### Closed Mosques
- GET /api/closed-mosques
- POST /api/closed-mosques
- PUT /api/closed-mosques/:id
- DELETE /api/closed-mosques/:id

### Blocked Projects
- GET /api/blocked-projects
- POST /api/blocked-projects
- PUT /api/blocked-projects/:id
- DELETE /api/blocked-projects/:id

## Technologies Used

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcryptjs
- multer (file uploads)

### Frontend
- React
- React Router
- Axios
- Material-UI
- Formik
- Yup
- React Query

## Security Features
- JWT-based authentication
- Password hashing
- Role-based access control
- CORS configuration
- Input validation
- Error handling middleware 
