import React from 'react'
import LoadingSpinner from "./LoadingSpinner"; 

const GenerateButton = ({ onClick, loading }) => {
  return (
    <>
   <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 px-6 rounded-xl font-semibold text-lg flex items-center justify-center 
                 transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md 
                 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg 
                 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <LoadingSpinner />  {/* Show spinner when loading */}
          <span className="ml-2">Generating...</span> 
        </>
      ) : (
        "Generate Reply"
      )}
    </button>

    </>
  )
}

export default GenerateButton