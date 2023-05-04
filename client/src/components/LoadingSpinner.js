import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
    <div className="min-h-screen flex justify-center items-center">
    <div style={{ borderTopColor: 'transparent' }}
        className="w-16 h-16 border-8 border-indigo-700  rounded-full animate-spin "></div>
</div>  
        </>
)
}

export default LoadingSpinner