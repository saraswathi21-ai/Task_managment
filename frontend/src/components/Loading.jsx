const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-100"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600 absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 font-medium text-lg">Loading...</p>
      </div>
    </div>
  )
}

export default Loading

