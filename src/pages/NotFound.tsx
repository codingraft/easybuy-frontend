
import { Link } from 'react-router-dom'
import { BiErrorCircle } from 'react-icons/bi'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <BiErrorCircle className="text-9xl text-red-500 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 font-medium shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound