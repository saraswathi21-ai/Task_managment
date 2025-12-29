import { Link } from 'react-router-dom'

const TaskCard = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500'
      case 'In Progress':
        return 'bg-blue-500'
      case 'Todo':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && task.status !== 'Completed'
  }

  return (
    <Link
      to={`/tasks/${task._id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-300 transform hover:-translate-y-1 group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1 group-hover:text-primary-600 transition-colors">
          {task.title}
        </h3>
        <span
          className={`ml-3 px-3 py-1 text-xs font-bold rounded-full border-2 shadow-sm ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full shadow-sm ${getStatusColor(task.status)}`}
          />
          <span className="text-sm font-medium text-gray-700">{task.status}</span>
        </div>

        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span
            className={`text-xs font-semibold ${
              isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard

