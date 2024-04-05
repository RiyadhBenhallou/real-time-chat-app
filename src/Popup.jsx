import { useState } from "react";

const Popup = ({ setPopup, username, setUsername }) => {
  

  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = () => {
    setUsername(username)
    setPopup(false)
  }
  
  return(
    <div onClick={() => setPopup(false)} className="flex items-center justify-center w-full h-screen bg-[rgb(0, 0, 0, 0.5)]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-slate-800 p-3 rounded-lg flex flex-col space-y-3">
        <input value={username} onChange={handleChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter your username..." />
        <button onClick={handleSubmit} className="bg-red-500 py-1 rounded-lg text-white text-sm font-semibold hover:bg-red-600 dark:text-slate-900">Submit</button>
      </div>
    </div>
  )
}

export default Popup;