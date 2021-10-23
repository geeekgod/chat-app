import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

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
            setMessageList(prev => [...prev, messageData])
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList(prev => [...prev, data])
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>WeBChat App</p>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent) => {
                    return (
                        <div
                            className="message"
                            id={username === messageContent.name ? "other" : "you"}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
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
