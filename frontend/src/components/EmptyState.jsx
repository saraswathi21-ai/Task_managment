import { Link } from 'react-router-dom'

const EmptyState = ({ message = 'No tasks found', showCreateButton = true }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <svg
          className="w-16 h-16 text-primary-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{message}</h3>
      <p className="text-gray-500 text-center mb-8 max-w-md text-lg">
        {showCreateButton
          ? 'Get started by creating your first task!'
          : 'Try adjusting your filters to see more tasks.'}
      </p>
      {showCreateButton && (
        <Link
          to="/tasks/new"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          Create Task
        </Link>
      )}
    </div>
  )
}

export default EmptyState

