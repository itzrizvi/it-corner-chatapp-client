import React from 'react';

const Messages = ({ message, user, conditionalClass }) => {

    if (user) {
        return (
            <div className={`MSGBox ${conditionalClass}`}>
                {`${user}: ${message}`}
            </div>
        );
    } else {
        return (
            <div className={`MSGBox ${conditionalClass}`}>
                {`You: ${message}`}
            </div>
        );
    }

};

export default Messages;