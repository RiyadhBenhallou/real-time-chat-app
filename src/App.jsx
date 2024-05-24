import useMessage from './hooks/useMessage.js'
import Popup from './Popup.jsx';
import io from "socket.io-client";


const socket = io.connect("https://chat-app-backend-1yxp.onrender.com")


export default function App() {

  const { message,
          messages,
          room,
          popup,
          theme,
          error,
          options,
          handleChange,
          sendMessage,
          handleUsernameChange,
          handleRoomChange,
          handleSubmit,
          togglePopup,
          setTheme } = useMessage(socket)


  return (
    <div className={`flex flex-col-reverse items-center w-full min-h-screen bg-slate-200 dark:bg-slate-900 relative`}>
      <Popup handleUsernameChange={handleUsernameChange} popup={popup} handleRoomChange={handleRoomChange} handleSubmit={handleSubmit} togglePopup={togglePopup} theme={theme} setTheme={setTheme} room={room} options={options} error={error} />
      <div className={`flex justify-center space-x-2 absolute bottom-10 right-50 left-50 z-[50] ${popup && 'hidden'}`}>
        <input value={message} onChange={handleChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter your message..." />

        <button onClick={sendMessage} className="bg-red-500 py-1 px-2 rounded-lg text-white font-semibold hover:bg-red-600 dark:text-slate-900 cursor-pointer">Send</button>

      </div>
      

      <div className={`white flex flex-col mb-20 rounded-lg w-5/6 overflow-hidden relative ${popup && 'hidden'}`}>
        {messages.map((msg, index) => (
          <div key={index} className={`${socket.id === msg.senderId ? "text-left bg-white dark:bg-slate-700" : "text-right bg-[#feffdb] dark:bg-slate-600"} p-1 font-sans md:text-lg text-black dark:text-white text-sm`}>
            <p className="text-xs text-gray-400 font-mono">User: {msg.username ? msg.username : msg.senderId}</p>
            <p >{msg.message}</p>
          </div>
        ))}
      </div>



    </div>
  );
}
