import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { taskAPI } from '../services/api'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchTask()
  }, [id])

  const fetchTask = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await taskAPI.getTask(id)
      setTask(response.data)
    } catch (err) {
      setError('Failed to fetch task. Please try again.')
      console.error('Error fetching task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await taskAPI.deleteTask(id)
      navigate('/')
    } catch (err) {
      setError('Failed to delete task. Please try again.')
      console.error('Error deleting task:', err)
      setDeleting(false)
      setDeleteModalOpen(false)
    }
  }

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && task?.status !== 'Completed'
  }

  if (loading) {
    return <Loading />
  }

  if (error && !task) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (!task) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Dashboard
      </Link>

      {/* Task Details Card */}
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">{task.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-4 py-2 text-sm font-bold rounded-full border-2 shadow-sm ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority} Priority
              </span>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full shadow-sm ${getStatusColor(task.status)}`}
                />
                <span className="text-sm font-semibold text-gray-700">{task.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{task.description}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Due Date</h3>
            <p
              className={`text-xl font-bold ${
                isOverdue(task.dueDate) ? 'text-red-600' : 'text-blue-800'
              }`}
            >
              {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && (
                <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Overdue</span>
              )}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Created At</h3>
            <p className="text-xl font-bold text-gray-800">{formatDate(task.createdAt)}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <Link
            to={`/tasks/${task._id}/edit`}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Edit Task
          </Link>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Delete Task
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Task"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete "{task.title}"? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default TaskDetails

