import { faChevronLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Picker from 'emoji-picker-react';
import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'simplebar-react';
import socketIO from "socket.io-client";
import Messages from '../../Home/Messages/Messages';
import PreviousMessege from '../../Home/PreviousMessege/PreviousMessege';
import attachmentImg from '../../images/attachment.svg.png';
import emojiPick from '../../images/emoji-smile.svg';
import prof2 from '../../images/m2essageImg.jpg';
import prof1 from '../../images/messageImg.jpeg';
import prof3 from '../../images/messageImg3.jpg';
import './MessageDetails.css';

const ENDPOINT = 'http://localhost:5000/';
let socket;

const MessageDetails = ({pageChange, presentPage}) => {
    const [userName, setUserName] = useState('');
    const [inputStr, setInputStr] = useState('');

    const [showPicker, setShowPicker] = useState(false);

    const [id, setId] = useState("");

    const [messages, setMessages] = useState([]);

    const [userTyping, setUserTyping] = useState('');

    const [typingKeys, setTypingKeys]= useState('');

    const [userDetect, setUserDetec] = useState('');

    const [chatHistory, setChatHistory]= useState([]);

    const [media, setMedia]= useState({});

    const loadUser =(e)=>{
        e.preventDefault();
        console.log(userName)
    }
    console.log( presentPage)
    console.log(userName)

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

    const filterUserChat = chatHistory.filter(item => item.user === userName);

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
 
        const newMessegeInsert ={messageInsert, userName, createdAt, mediaFiles};

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
        socket.emit('user', userName);
        socket.emit('typing', userName);
    }

    useEffect(() => {


        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on("connect", () => {
            setId(socket.id);
        });

        socket.emit("logedIn", { userName });

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

    const clockIcon = <FontAwesomeIcon icon={faClock} style={{color:"white"}} className="fas fa-camera clock-Icon"/>

    const msgDetailIcon = <FontAwesomeIcon icon={faChevronLeft} style={{color:"white"}} className="fas fa-camera"/>
    // const smile = <FontAwesomeIcon icon={faSmile} style={{color:"#d0d0d0"}} className="fas fa-camera fa-lg"/>
    // const paperClip = <FontAwesomeIcon icon={faPaperclip} style={{color:"#d0d0d0"}} className="fas fa-camera fa-lg"/>


    return (
        <div className='justify-content-center chat-popup-content'>
            
            <div className='msdDetailImg sticky-top d-flex bd-highlight container pt-3 text-white'>
                
                <div className="p-2 flex-shrink-1 bd-highlight pe-3">
                    
                <button onClick={()=> pageChange("messageDetails")} type="button" className="btn backBtn animate__animated animate__slideInUp animate__delay-0.5s">{msgDetailIcon}</button>
                
                </div>
                <div className="p-2 w-100 bd-highlight ps-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                    <h4>Intercom</h4>
                    <p>We help your business grow by connecting <br/> you to your customers.</p>


                    <div className='d-flex row'>
                        <div className='col-5 image-holder '>
                            <img className='image1' src={prof1} alt="..."/>
                            <img className='image2' src={prof2} alt="..."/>
                            <img className='image3' src={prof3} alt="..."/>
                        </div>
                        <div className='col-7 text-white'>

                            <p>Our usual reply time</p>
                            <p><span >{clockIcon}</span><b> A few minutes</b></p>
                        </div>
                    </div>
                </div>
            </div>   

                

            {/* messege history part      */}


                <div id='chat-container' className="d-flex align-items-start flex-column bd-highlight mb-3" >
                {/* height:" 580px"  this need to be change for chat-container*/}
                
                <PerfectScrollbar >
                <div className="mb-auto px-2 bd-highlight load-user-form" id='perfect-scroll'>
                   {!userName && <form onSubmit={loadUser} className='load-user'>
                        <input type="text" onBlur={(e)=> setUserName(e.target.value)} placeholder='Please Enter Your Name...'/>
                        <button type='submit'>Login</button>
                        
                    </form>}
                    <div className="chatbox">

                            {filterUserChat.length !== 0 && msgHistorySorting.map((item, i)=> <PreviousMessege 
                                key={i}
                                mediaFiles={item?.mediaFiles}
                                message={item.messageInsert} 
                                user={item.user === userName ? '' : item.user}
                                createdAt ={item.createdAt} 
                                conditionalClass={item.user === userName ? 'right-side-chat' : 'left-side-chat'}
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
                    </div>
                </div>
                </PerfectScrollbar>


                {/* messege sending part  */}
                {userName && <div className="msg-inputBox picker-container">
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

                </div>}
            </div>
            </div>
    );
};

export default MessageDetails;