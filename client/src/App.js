import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && username !== " " && room !== "" && room !== " ") {
      console.log("hello");
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Join Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
};

export default App;
