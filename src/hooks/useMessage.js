import { useState, useEffect } from "react";

export default function useMessage(socket) {


  // const socket = io.connect('https://ceddeb97-b370-4ab4-992a-18740d698be3-00-9f7v099mjcbh.kirk.replit.dev:3000/');

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


    // const togglePopup = () => {
    //   if (!room) {
    //     return setPopup(true)
    //   }
    //   setPopup(!popup)
    // }

    const handleChange = (e) => {
      setMessage(e.target.value);
    }

    const sendMessage = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button click
// Check if the message is not empty
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

    //---------------------------------------------
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
        socket.emit("join-room", { room })
        setPopup(false)
        error && setError(false)
    }

    const togglePopup = () => {
      if (!room) {
        setError(true)
        return setPopup(true)
      }
      setUsername(username)
      socket.emit("join-room", { room })
      setPopup(!popup)
      error && setError(false)
    }
    //--------------------------------------------
  return {
    message,
    messages,
    username,
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
    setTheme,
    setPopup
  };
}