import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SearchForHelp.css';

const SearchForHelp = () => {
    const searchIcon = <FontAwesomeIcon icon={faSearch} className="fas fa-camera fa-lg"/>
    return (
        <div className='container pb-3'>
            <h5 className='pt-3 pb-2'>Search for help</h5>
            

            <div className="input-group mb-3 col pt-1">

                
                <div className=' form-full d-flex'>
                <button className="btn btn-outline-secondary search-btn shadow-none" type="button" id="button-addon1">{searchIcon}</button>
                <input type="text" className="form-control form-style shadow-none" aria-label="Example text with button addon" aria-describedby="button-addon1" placeholder="Search Articles..."/>
                </div>
            </div>
            
        </div>
    );
};

export default SearchForHelp;