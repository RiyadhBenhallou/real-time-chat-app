import { useState } from "react";

const Popup = ({ setPopup, username, setUsername, room, setRoom, socket }) => {
  const [error, setError] = useState(false)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleRoomChange = (e) => {
    setRoom(e.target.value)
  }
  const handleSubmit = () => {
    if (!room) {
      return setError(true)
    }
      setUsername(username)
      //setRoom(room)
      socket.emit("join-room", { room })
      setPopup(false)
  }
  
  return(
    <div onClick={handleSubmit} className="flex items-center justify-center w-full h-screen bg-[rgb(0, 0, 0, 0.5)]">
      <div onClick={(e) => e.stopPropagation()} className={`bg-white dark:bg-slate-800 p-3 rounded-lg flex flex-col space-y-3 ${error && 'border border-red-500'}`}>
        <input value={username} onChange={handleUsernameChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter your username..." />
        <input type="number" value={room} onChange={handleRoomChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter room number..." />
        <button onClick={handleSubmit} className="bg-red-500 py-1 rounded-lg text-white text-sm font-semibold hover:bg-red-600 dark:text-slate-900">Submit</button>
      </div>
    </div>
  )
}

export default Popup;