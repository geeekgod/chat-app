import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "" && currentMessage !== " ") {
            const messageData = {
                room: room,
                name: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>WeBChat App</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Hey.."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;
