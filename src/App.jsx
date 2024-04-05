import { useState, useEffect } from "react";
import io from "socket.io-client";
import Popup from './Popup.jsx';

//const socket = io.connect('https://ceddeb97-b370-4ab4-992a-18740d698be3-00-9f7v099mjcbh.kirk.replit.dev:3000/');
const socket = io.connect('http://localhost:3000/');

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [popup, setPopup] = useState(true);
  const [theme, setTheme] = useState('dark')

  const options = [
    { icon: "sunny", theme: "light" },
    { icon: "moon", theme: "dark" },
  ]

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;
        case "light":
        document.documentElement.classList.remove("dark");
        break;
    }
  }, [theme])

  const togglePopup = () => {
    setPopup(!popup)
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    socket.emit("send-message", { message, username, room });
    setMessage(""); // Clear input after sending message
  }

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive-message");
    }
  }, [socket]);

  return (
    <div className={`flex flex-col items-center w-full min-h-screen bg-slate-200 dark:bg-slate-900 relative`}>
      {popup && <Popup setPopup={setPopup} username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />}
      <div className={`flex justify-center space-x-2 fixed top-10 right-50 left-50 z-[50] ${popup && 'hidden'}`}>
        <input value={message} onChange={handleChange} className="border rounded-lg placeholder:text-sm placeholder:text-gray-400 text-black dark:text-white focus:outline-gray-200 dark:focus:outline-slate-500 px-2 py-1 dark:bg-slate-700 dark:border-slate-700" placeholder="Enter your message..." />

        <button onClick={sendMessage} className="bg-red-500 py-1 px-2 rounded-lg text-white font-semibold hover:bg-red-600 dark:text-slate-900">Send</button>
        
      </div>
      <div className="absolute flex  space-x-1 top-1 right-4 bg-white dark:bg-slate-700 p-1 rounded-lg">
      {options.map(opt => {
        return (
          <button onClick={() => setTheme(opt.theme)} className={`w-4 h-4 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-black dark:text-white ${theme === opt.theme && 'text-yellow-500 dark:text-sky-500'}`}>
            <ion-icon name={opt.icon}></ion-icon>
          </button>
        )
        })}
        <button onClick={togglePopup} className={`w-4 h-4 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-black dark:text-white`}>
          <ion-icon name="settings"></ion-icon>
        </button>
        </div>
      
      <div className="mt-20 white rounded-lg w-5/6 overflow-hidden relative">
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
