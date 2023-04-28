import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
    <div class="min-h-screen flex justify-center items-center">
    <div style={{ borderTopColor: 'transparent' }}
        class="w-16 h-16 border-8 border-indigo-700  rounded-full animate-spin "></div>
</div>  
        </>
)
}

export default LoadingSpinner