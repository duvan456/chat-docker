import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        socket.on('previousMessages', (data) => {
            setMessages(data);
        });

        socket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('previousMessages');
            socket.off('message');
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (username && message) {
            socket.emit('message', { username, message });
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.username}:</strong> {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={sendMessage}>
                <div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id='inputNombre'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Mensaje"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        id='inputMensaje'
                    />
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default Chat;

