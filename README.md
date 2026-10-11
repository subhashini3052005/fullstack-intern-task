# Mini SaaS Template Store

A full-stack web application that allows users to register, log in, browse templates, and manage their favorite templates.

## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- View available templates
- Add templates to favorites
- View and remove favorite templates
- MongoDB database integration
- Responsive user interface

## Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router

**Backend:** Node.js, Express.js

**Database:** MongoDB with Mongoose

**Authentication:** JSON Web Tokens (JWT), bcrypt

**Version Control:** Git and GitHub

## Project Structure

```text
fullstack-intern-task/
├── client/
├── server/
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB connection
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd fullstack-intern-task
```

### 2. Start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and configure your MongoDB connection string, JWT secret, and port according to your backend configuration.

Start the backend:

```bash
npm run dev
```

### 3. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Sample Data

The application includes at least five sample templates. Run the project's seed script if the database has not been populated.

## Author

**Name:** Subhashini S

**GitHub:** https://github.com/subhashini3052005

**Email:** Add your professional email address here
