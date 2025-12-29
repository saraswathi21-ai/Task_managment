# Task Management Web Application

A modern, full-stack task management web application built with React, Node.js, Express, and MongoDB. This application allows users to create, view, update, and delete tasks with a beautiful, responsive UI.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and professional interface built with Tailwind CSS
- 🔍 **Filtering & Sorting**: Filter tasks by status and sort by priority or due date
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎯 **Task Management**: Track tasks with priority levels, status, and due dates

## Tech Stack

### Frontend
- **React.js** (v18) - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling

## Project Structure

```
Taskmanagment/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js  # Task CRUD logic
│   ├── models/
│   │   └── Task.js            # Task schema/model
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (free tier works) or local MongoDB instance

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Taskmanagment
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if it exists) or create a new `.env` file
   - Update the MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

   **For MongoDB Atlas:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string from the Atlas dashboard
   - Replace `<username>`, `<password>`, and `<cluster>` with your credentials

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

**Optional: Seed Sample Data**
```bash
npm run seed
```
This will populate your database with sample tasks for testing.

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up environment variables:
   - Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **View All Tasks**: Navigate to the Dashboard (home page) to see all your tasks
2. **Create Task**: Click "Create Task" in the sidebar or navigate to `/tasks/new`
3. **View Task Details**: Click on any task card to view its details
4. **Edit Task**: Click "Edit Task" button on the task details page
5. **Delete Task**: Click "Delete Task" button and confirm the deletion
6. **Filter Tasks**: Use the status filter dropdown on the Dashboard
7. **Sort Tasks**: Use the sort dropdown to sort by priority or due date

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (supports query params: `status`, `sortBy`)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "priority": "High",
  "status": "In Progress",
  "dueDate": "2024-12-31"
}
```

**Get All Tasks with Filters:**
```
GET /api/tasks?status=Todo&sortBy=priority
```

## Task Schema

```javascript
{
  title: String (required, max 200 chars),
  description: String (optional, max 1000 chars),
  priority: String (required, enum: ['Low', 'Medium', 'High']),
  status: String (required, enum: ['Todo', 'In Progress', 'Completed']),
  dueDate: Date (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Sample Task Data

You can create sample tasks through the UI or use the API directly. Example:

```json
{
  "title": "Review project proposal",
  "description": "Review and provide feedback on the Q4 project proposal",
  "priority": "High",
  "status": "Todo",
  "dueDate": "2024-12-15"
}
```

## Development

### Backend Development
- The backend uses `nodemon` for auto-restart during development
- Server runs on port 5000 by default
- API routes are prefixed with `/api`

### Frontend Development
- Uses Vite for fast HMR (Hot Module Replacement)
- Runs on port 3000 by default
- Proxy configured to forward `/api` requests to backend

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (for development)
- Verify your connection string is correct
- Check that your MongoDB cluster is running

### CORS Issues
- The backend has CORS enabled for all origins
- If you encounter CORS errors, check the backend server is running

### Port Already in Use
- Change the port in `.env` file (backend) or `vite.config.js` (frontend)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.

