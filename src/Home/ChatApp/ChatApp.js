import Picker from 'emoji-picker-react';
import React, { useEffect, useState } from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIO from "socket.io-client";
import attachmentImg from '../../images/attachment.svg.png';
import emojiPick from '../../images/emoji-smile.svg';
import { user } from '../Login/Login';
import Messages from '../Messages/Messages';
import PreviousMessege from '../PreviousMessege/PreviousMessege';
import './ChatApp.css';


const ENDPOINT = 'http://localhost:5000/';

let socket;
const ChatApp = () => {

    const [inputStr, setInputStr] = useState('');

    const [showPicker, setShowPicker] = useState(false);

    const [id, setId] = useState("");

    const [messages, setMessages] = useState([]);

    const [userTyping, setUserTyping] = useState('');

    const [typingKeys, setTypingKeys]= useState('');

    const [userDetect, setUserDetec] = useState('');

    const [chatHistory, setChatHistory]= useState([]);

    const [media, setMedia]= useState({});

    useEffect(()=>{
        fetch('http://localhost:5000/msghistory')
        .then(res=>res.json())
        .then(data=>{
            setChatHistory(data);
            
        })
    },[]);

   

    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const filterUserChat = chatHistory.filter(item => item.user === user);

    const msgSortings = chatHistory.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    const msgHistorySorting = msgSortings.reverse();

    const sendMessage = () => {
        const message = document.getElementById('chatInput').value;
        const mediaFiles = media;

        socket.emit('message', { message,mediaFiles, id });
        
        const messageInsert = document.getElementById('chatInput').value;

        const gettingMSGTime = new Date(Date.now());
        let createdAt = gettingMSGTime.toString();
 
        const newMessegeInsert ={messageInsert, user, createdAt, mediaFiles};

        fetch('http://localhost:5000/msghistory',{
            method:'POST',
            headers:{
                'content-type' : 'application/json',
            },
            body: JSON.stringify(newMessegeInsert),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                document.getElementById('chatInput').value = "";
                document.getElementById('attchInput').value = "";
                // console.log('Dhukse')
                setMedia("");
            }
        });

    }

    
    const typingNotification = () => {
        let typedMessage = document.getElementById('chatInput').value;
        setInputStr(typedMessage)
        setTypingKeys(typedMessage);
        socket.emit('typingProcess', typingKeys);
        socket.emit('user', user);
        socket.emit('typing', user);
    }

    useEffect(() => {


        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on("connect", () => {
            setId(socket.id);
        });

        socket.emit("logedIn", { user });

        // socket.on('welcome', (data) => {
        //     setMessages([...messages, data]);
        // });

        // socket.on('joinedUser', (data) => {
        //     setMessages([...messages, data]);
        // });

        // socket.on('leave', (data) => {
        //     setMessages([...messages, data]);
        // });

        return () => {
            // socket.emit('disconnectUser');
            socket.off();
        }
    }, []);


    useEffect(() => {
        socket.on('messageSent', (data) => {
            setMessages([...messages, data]);
        });
        // socket.on('typing', (user) => {
        //     setUserTyping(`${user} : is typing...!!!`);
        //     setTimeout(() => {
        //         setUserTyping('');
        //     }, 5000);
        // });

        socket.on('typingProcess', (typingKeys)=>{
            setUserTyping(typingKeys);
            setTimeout(() => {
                setUserTyping('');
            }, 5000);
        });

        socket.on('user', (user)=>{
            setUserDetec(user);
            setTimeout(() => {
                setUserDetec();
            }, 5000);
        });

        return () => {
            socket.off();
            setUserTyping('')
        }
    }, [messages, typingKeys]);

    return (
        <div className='chatcomp'>
            <div className="chat-container">
                <div className="chat-header">
                    <h2>IT-Corner Chat App</h2>
                </div>
                <h3>This is {user}</h3>
                    <ReactScrollToBottom className="chatbox" style={{padding:'10px'}}>

                            {filterUserChat.length !== 0 && msgHistorySorting.map((item, i)=> <PreviousMessege 
                                key={i}
                                mediaFiles={item?.mediaFiles}
                                message={item.messageInsert} 
                                user={item.user === user ? '' : item.user}
                                createdAt ={item.createdAt} 
                                conditionalClass={item.user === user ? 'right-side-chat' : 'left-side-chat'}
                                ></PreviousMessege>)}

                            {messages.map((item, i) => <Messages 
                                key={i}
                                mediaFiles={item.mediaFiles}
                                message={item.message} 
                                user={item.id === id ? '' : item.user} 
                                conditionalClass={item.id === id ? 'right-side-chat' : 'left-side-chat'} />)}

                            <div className='typing-div'>
                                {userTyping && <p className='typing-tag'>{userDetect} : {userTyping}</p>}
                            </div>
                    </ReactScrollToBottom>
                <div className="msg-inputBox picker-container">
                    <input onChange={e => setInputStr(e.target.value)} value={inputStr} onKeyUp={(event) => event.key === 'Enter' ? sendMessage() : typingNotification()} type="text" id='chatInput' />
                    <img className="emoji-icon" alt='EMOJI' src={emojiPick} onClick={() => setShowPicker(val => !val)} />
                    {showPicker && <Picker pickerStyle={{ width: '100%' }} onEmojiClick={onEmojiClick} />}
                    <input onChange={(e)=>{
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(){
                            console.log(reader.result);
                            setMedia({
                                image: true,
                                content: reader.result,
                                name: file.name,
                            })
                        }

                        reader.onerror = function(error){
                            console.log(error);
                        }
                    }} type="file" id='attchInput' />
                    <label htmlFor="attchInput">
                        <img className="attachment-icon" alt='ATTACHMENT' src={attachmentImg} />
                    </label>
                    <button onClick={sendMessage} className='msgSend-btn'>Send</button>

                </div>
                            
            </div>


        </div>
    );
};

export default ChatApp;