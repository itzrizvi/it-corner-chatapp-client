import React from 'react';
import { format } from 'timeago.js';

const PreviousMessege = ({message, user, conditionalClass, createdAt, mediaFiles }) => {

    if (user) {
        return (
                <div className={`${conditionalClass}`}>
                    <span>{`${user}: ${message}`}</span>
                    {mediaFiles?.image === true && <img className="chat-img" alt='ATTACHMENT' src={mediaFiles.content} />}
                    <span className='chat-date'>{format(createdAt)}</span>
                    
                </div>
        );
    } else {
        return (
                <div className={`${conditionalClass}`}>
                    <span>{`You: ${message}`}</span>
                    {mediaFiles?.image === true && <img className="chat-img" alt='ATTACHMENT' src={mediaFiles.content} />}
                    <span className='chat-date'>{format(createdAt)}</span>
                </div>
        );
    }
};

export default PreviousMessege;