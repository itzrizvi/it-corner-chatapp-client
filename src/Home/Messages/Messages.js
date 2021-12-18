import React from 'react';

const Messages = ({ message, user, conditionalClass }) => {

    if (user) {
        return (
                <div className={`${conditionalClass}`}>
                    {`${user}: ${message}`}
                </div>
        );
    } else {
        return (
                <div className={`${conditionalClass}`}>
                    {`You: ${message}`}
                </div>
        );
    }

};

export default Messages;