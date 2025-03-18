import React, { useState, useEffect, useRef } from "react";
import { connectToChat, sendMessage } from "../services/chatService";
import "../styles/Chat.css"; // Import CSS styles

const contacts = [
    { name: "user1", avatar: "" },
    { name: "user2", avatar: "" },
    { name: "user3", avatar: "" },
];

const Chat = ({ currentUser, chatPartner }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedContact, setSelectedContact] = useState(contacts[0]); 
    const [connection, setConnection] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!currentUser || !chatPartner) return;

        setMessages([]);

        const conn = connectToChat((sender, message) => {
            setMessages(prevMessages => [...prevMessages, { sender, message, timestamp: new Date().toLocaleTimeString() }]);
            scrollToBottom();
        });
        setConnection(conn);

        fetch(`${process.env.REACT_APP_API_URL}/api/chat/${currentUser}/${selectedContact.name}`)
            .then(response => response.json())
            .then(data => setMessages(data.map(msg => ({
                ...msg,
                timestamp: new Date().toLocaleTimeString()
            }))))
            .catch(error => console.error("Error fetching chat history:", error));

        return () => {
            conn.stop();
        };
    }, [currentUser, selectedContact]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        const timestamp = new Date().toLocaleTimeString();
        const newMsg = { sender: currentUser, message: newMessage, timestamp };

        await sendMessage(connection, currentUser, chatPartner, newMessage);
        setMessages([...messages, { sender: currentUser, message: newMessage }]);
        setNewMessage("");
        scrollToBottom();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="chat-container">
            {/* Sidebar */}
            <div className="chat-sidebar">
                <div className="sidebar-profile">
                    <h3>Chats</h3>
                </div>
                <input type="text" placeholder="Search" className="search-bar" />
                <div className="contact-list">
                    {contacts.map(contact => (
                        <div 
                            key={contact.name} 
                            className={`contact-item ${contact.name === selectedContact.name ? "active" : ""}`} 
                            onClick={() => setSelectedContact(contact)}
                        >
                            <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
                            <div className="contact-info">
                                <span className="contact-name">{contact.name}</span>
                                <span className="last-message">
                                    {messages.length > 0 ? messages[messages.length - 1].message : "No messages"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <img src={selectedContact.avatar} alt={selectedContact.name} className="chat-avatar" />
                    <h3>{selectedContact.name}</h3>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === currentUser ? "sent" : "received"}`}>
                            <div className="message-text">{msg.message}</div>
                            <div className="message-timestamp">{msg.timestamp}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-container">
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message" 
                        className="chat-input"
                    />
                    <button onClick={handleSendMessage} className="chat-send-button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
