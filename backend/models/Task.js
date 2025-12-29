import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Todo', 'In Progress', 'Completed'],
      default: 'Todo'
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;

