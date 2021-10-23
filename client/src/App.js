import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";
import { v4 as uuid } from "uuid";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && username !== " " && room !== "" && room !== " ") {
      console.log("hello");
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          {" "}
          <h3>Join WeBChat</h3>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Press enter to get room id or paste room id"
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setRoom(uuid());
              }
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>{" "}
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default App;
