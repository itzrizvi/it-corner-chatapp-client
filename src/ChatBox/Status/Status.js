import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Status = () => {
    const checkIcon =  <FontAwesomeIcon icon={faCheckCircle} className="fas fa-camera fa-3x text-success"/>


    return (
        <div className='container pb-1'>
            
            <div className="d-flex bd-highlight">
            <div className="p-2 flex-shrink-1 bd-highlight d-flex align-items-center">
                
                {checkIcon}
            </div>
            <div className="p-2 w-100 bd-highlight">
                    <div className='col'>
                        <p  className='text-primary'>Status: All System Operational</p>
                        <p className='text-secondary'>Updated Dec 16, 08 UTC</p>
                    </div>
            </div>
            </div>
        
        
    </div>
    );
};

export default Status;