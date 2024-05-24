import { useState } from "react";

const Popup = ({ popup, handleUsernameChange, handleSubmit, togglePopup, username, theme, setTheme, handleRoomChange, room, options, error }) => {
  

  return(
    <>
      <div className="absolute flex space-x-1 bottom-2 right-50 left-50 bg-white dark:bg-slate-700 p-1 rounded-lg z-[100]">
        {options.map(opt => {
          return (
            <button
              onClick={() => setTheme(opt.theme)}
              className={`w-4 h-4 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 ${
                theme === opt.theme ? 'text-yellow-500 dark:text-blue-500' : 'text-black dark:text-white'
              }`}
            >
              <ion-icon name={opt.icon}></ion-icon>
            </button>
          )
          })}
          <button onClick={togglePopup} className={`w-4 h-4 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-black dark:text-white`}>
            <ion-icon name={popup ? "close" : "settings"}></ion-icon>
          </button>
          </div>
      
      {popup && <div onClick={handleSubmit} className="flex items-center justify-center w-full h-screen bg-[rgb(0, 0, 0, 0.5)]">
      <div onClick={(e) => e.stopPropagation()} className={`bg-white dark:bg-slate-800 p-3 rounded-lg flex flex-col space-y-3 ${error && 'border border-red-500'}`}>
        <input value={username} onChange={handleUsernameChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter your username..." />
        <input type="number" value={room} onChange={handleRoomChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter room number..." />
        <button onClick={handleSubmit} className="bg-red-500 py-1 rounded-lg text-white text-sm font-semibold hover:bg-red-600 dark:text-slate-900">Enter</button>
      </div>
    </div>}
    </>
  )
}

export default Popup;