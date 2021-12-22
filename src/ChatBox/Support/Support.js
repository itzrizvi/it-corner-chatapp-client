import React from 'react';
import supportImg from '../../images/ezgif.com-gif-maker.jpg';

const Support = () => {
    return (
        <>
            <img src={supportImg} className="card-img-top p-4" alt="..."/>
            <div className="card-body border-top">
            <h6 className='text-primary'>Ultimate Modern Support Tech Stack</h6>
            <p className="card-text text-secondary">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </>
    );
};

export default Support;