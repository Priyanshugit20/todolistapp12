
# TaskQuest - Full Stack Todo Application

A full-featured task management application built with React, Node.js, MongoDB, and Tailwind CSS.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed/incomplete
- Categorize tasks with custom categories
- Search tasks by title or description
- Filter tasks by category and status
- Responsive design for all devices

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: React Context API
- **Styling**: Tailwind CSS and ShadcnUI components

## Project Structure

```
taskquest/
├── public/              # Static files for the frontend
├── server/              # Backend server code
│   ├── models/          # MongoDB schema models
│   ├── routes/          # API routes
│   ├── index.js         # Server entry point
│   ├── package.json     # Backend dependencies
├── src/                 # Frontend React code
│   ├── components/      # React components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Frontend dependencies
```

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally or connection string to MongoDB Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/taskquest.git
   cd taskquest
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

4. Create a `.env` file in the server directory with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskquest
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173` to see the application.

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get a specific category
- `PATCH /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category
```
