import React from 'react';
import newInter from '../../images/whatsNew.jpg';
import './NewInIntercom.css';

const NewInIntercom = () => {
    return (
        <>
            
            <div className="card-body border-top">
            <h5>Build for you- New in Intercom</h5>
            </div>
            <div className="card-body border-top">
                <div className="d-flex">
                    <div className="flex-shrink-0  d-flex align-items-center">
                        <img  src={newInter} alt="..."/>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className='text-primary'>Automatically create salesforce cases from conversations in Intercom</p>
                        <p className='text-secondary'>Keep your support team operating...</p>
                    </div>
                </div>
            </div>

            <div className="card-body border-top">
                <div className="d-flex">
                    <div className="flex-shrink-0  d-flex align-items-center">
                        <img  src={newInter} alt="..."/>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className='text-primary'>Automatically create salesforce cases from conversations in Intercom</p>
                        <p className='text-secondary'>Keep your support team operating...</p>
                    </div>
                </div>
            </div>

            <div className="card-body border-top">
                <div className="d-flex">
                    <div className="flex-shrink-0  d-flex align-items-center">
                        <img  src={newInter} alt="..."/>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className='text-primary'>Automatically create salesforce cases from conversations in Intercom</p>
                        <p className='text-secondary'>Keep your support team operating...</p>
                    </div>
                </div>
            </div>
            
            
        </>
    );
};

export default NewInIntercom;