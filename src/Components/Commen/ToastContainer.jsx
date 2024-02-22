import React from 'react'
import { ToastContainer } from 'react-toastify';


export function Toastcontainer() {
  return (
    <div>
      <ToastContainer>
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce,
    </ToastContainer>
    </div>
  )
}
