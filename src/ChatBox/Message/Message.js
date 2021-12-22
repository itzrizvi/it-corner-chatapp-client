import { faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import prof2 from '../../images/m2essageImg.jpg';
import prof1 from '../../images/messageImg.jpeg';
import prof3 from '../../images/messageImg3.jpg';
import './Message.css';

const Message = ({pageCng, currPage}) => {

    const clockIcon = <FontAwesomeIcon icon={faClock} className="fas fa-camera clock-Icon"/>
    const sendIcon =  <FontAwesomeIcon icon={faPaperPlane} className="fas fa-camera"/>

    return (
        <div className='container pb-3'>
            <h5 className='pt-3 pb-2'><b>Start a conversation</b></h5>
            <div className="col row">
                <div className="col image-holder">

                    {/* <span className='image1'><img  src={prof1} alt="..."/></span>
                    <span className='image2'><img  src={prof2} alt="..."/></span> */}
                    <img className='image1' src={prof1} alt="..."/>
                    <img className='image2' src={prof2} alt="..."/>
                    <img className='image3' src={prof3} alt="..."/>
                    {/* <img className='image1' src={prof3} alt="..."/>  */}
                </div>
                <div className="col">
                    <p className='text-secondary'>Our usual reply time</p>
                    <p>{clockIcon}<b> A few minutes</b></p>
                </div>
            </div>
            <div className="col">

                <button type="button" className="btn btn-primary send-Icon" onClick={() => pageCng("messageDetails")}>{sendIcon} <b className='px-2'>send us message</b> </button>
            </div>
            
        </div>
    );
};

export default Message;