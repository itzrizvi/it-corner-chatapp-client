import React from 'react';

const Register = () => {


    const regitrationHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2>Register Here</h2>
            <form onSubmit={regitrationHandler} >
                <input type="text" id="register-first-name" placeholder='Enter Your First Name' /> <br />
                <input type="text" id="register-last-name" placeholder='Enter Your Last Name' /><br />
                <input type="email" id="register-email" placeholder='Enter Your Email' /><br />
                <input type="password" id="register-user-pass" placeholder='Enter Your Password' /><br />
                <input type="password" id="re-register-user-pass" placeholder='Re-enter Your Password' /><br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;