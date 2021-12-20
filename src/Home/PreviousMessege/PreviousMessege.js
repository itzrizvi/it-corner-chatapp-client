import React from 'react';
import { format } from 'timeago.js';

const PreviousMessege = ({message, user, conditionalClass, createdAt }) => {

    if (user) {
        return (
                <div className={`${conditionalClass}`}>
                    <span>{`${user}: ${message}`}</span>
                    <span className='chat-date'>{format(createdAt)}</span>
                    
                </div>
        );
    } else {
        return (
                <div className={`${conditionalClass}`}>
                    <span>{`You: ${message}`}</span>
                    <span className='chat-date'>{format(createdAt)}</span>
                </div>
        );
    }
};

export default PreviousMessege;