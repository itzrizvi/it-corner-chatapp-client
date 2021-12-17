import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";
import { user } from '../Login/Login';
import Messages from '../Messages/Messages';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import './ChatApp.css';

const ENDPOINT = 'http://localhost:5000/';

let socket;
const ChatApp = () => {

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const [userTyping, setUserTyping] = useState('');

    const sendMessage = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";

    }
    const typingNotification = () => {
        socket.emit('typing', user);
    }

    useEffect(() => {


        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on("connect", () => {
            setId(socket.id);
        });

        socket.emit("logedIn", { user });

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
        });

        socket.on('joinedUser', (data) => {
            setMessages([...messages, data]);
        });

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            socket.emit('disconnectUser');
            socket.off();
        }
    }, []);


    useEffect(() => {
        socket.on('messageSent', (data) => {
            setMessages([...messages, data]);
        });
        socket.on('typing', (user) => {
            setUserTyping(`${user} is typing...!!!`);
            setTimeout(() => {
                setUserTyping('');
            }, 5000);
        });

        return () => {
            socket.off();
            setUserTyping('')
        }
    }, [messages]);

    return (
        <div className='chatcomp'>
            <div className="chat-container">
                <div className="chat-header">
                    <h2>IT-Corner Chat App</h2>
                </div>
                <h3>This is {user}</h3>
                <ReactScrollToBottom className="chatbox">
                    {userTyping && <p>{userTyping}</p>}
                    {messages.map((item, i) => <Messages key={i} message={item.message} user={item.id === id ? '' : item.user} conditionalClass={item.id === id ? 'right-side-chat' : 'left-side-chat'} />)}
                </ReactScrollToBottom>
                <div className="msg-inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : typingNotification()} type="text" id='chatInput' />
                    <button onClick={sendMessage} className='msgSend-btn'>Send</button>

                </div>
            </div>


        </div>
    );
};

export default ChatApp;