import * as signalR from "@microsoft/signalr";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5083";

export const connectToChat = (onMessageReceived) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}/chatHub`, {
            withCredentials: false
        })
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(() => console.log("Connected to SignalR chat hub"))
        .catch(err => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveMessage", (sender, message) => {
        console.log("New message received:", sender, message);
        onMessageReceived(sender, message);
    });

    return connection;
};

export const sendMessage = async (connection, sender, receiver, message) => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke("SendMessage", sender, receiver, message);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    } else {
        console.error("Connection is not established.");
    }
};
