import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from '../models/Task.js';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Sample tasks
    const sampleTasks = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the task management application including setup instructions and API documentation.',
        priority: 'High',
        status: 'In Progress',
        dueDate: new Date('2024-12-20'),
      },
      {
        title: 'Review code changes',
        description: 'Review pull requests and provide feedback on code changes.',
        priority: 'Medium',
        status: 'Todo',
        dueDate: new Date('2024-12-18'),
      },
      {
        title: 'Team meeting preparation',
        description: 'Prepare agenda and materials for the weekly team meeting.',
        priority: 'Low',
        status: 'Todo',
        dueDate: new Date('2024-12-15'),
      },
      {
        title: 'Update dependencies',
        description: 'Update npm packages to their latest versions and test for compatibility.',
        priority: 'Medium',
        status: 'Completed',
        dueDate: new Date('2024-12-10'),
      },
      {
        title: 'Design new feature',
        description: 'Create wireframes and mockups for the new dashboard feature.',
        priority: 'High',
        status: 'Todo',
        dueDate: new Date('2024-12-25'),
      },
    ];

    // Insert sample tasks
    const createdTasks = await Task.insertMany(sampleTasks);
    console.log(`Created ${createdTasks.length} sample tasks`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed function
seedData();

