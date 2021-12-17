import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to IT-Corner Chat App</h2>
            <Link to="/login">Go To Login Page</Link>
            <Link to="/register">Register Here</Link>
        </div>
    );
};

export default Home;