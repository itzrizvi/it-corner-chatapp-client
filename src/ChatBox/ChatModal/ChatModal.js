import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'animate.css';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MessageDetails from '../MessageDetails/MessageDetails';
import Modal from '../Modal/Modal';
import './ChatModal.css';


const ChatModal = () => {
    const msgIcon = <FontAwesomeIcon icon={faCommentAlt} className="fas fa-camera fa-2x"/>

    const [window, setWindow] = useState("modal")

    let Comp 
    if (window === "modal") {
        Comp = <Modal pageChange={setWindow} presentPage={window}></Modal>
    }else if(window === "messageDetails"){
        Comp = <MessageDetails pageChange={setWindow} presentPage={window}></MessageDetails>
    }

    return (
        <div className="d-flex align-items-end chat-modal">
            <div className="animate__animated  animate__delay-2s animate__rotateIn">Example</div>
            <Popup 
            trigger={open => (<button onClick={()=>setWindow("modal")} className="btn btn-primary button chat-icon">{msgIcon}</button>)}
            position="top right"
            contentStyle={{ padding: '0px'}}
            arrow={false}
            nested    
            closeOnDocumentClick
            mouseEnterDelay={0}
            >     
                {Comp}
                {/* <Modal></Modal> */}
                {/* <MessageDetails></MessageDetails> */}
            </Popup>
        </div>
    );
};

export default ChatModal;