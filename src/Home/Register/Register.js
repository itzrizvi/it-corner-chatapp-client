import React, { useState } from 'react';

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const handleRegValues = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegistrationData = { ...registerData };
        newRegistrationData[field] = value;
        setRegisterData(newRegistrationData);
    }
    const regitrationHandler = (e) => {
        e.preventDefault();
        if (registerData.passwordOne !== registerData.passwordTwo) {
            alert('Password Didn\'t Matched!!!');
            return;
        }
        console.log(registerData);
    }

    return (
        <div>
            <h2>Register Here</h2>
            <form onSubmit={regitrationHandler} >
                <input type="text" onBlur={handleRegValues} name='firstName' id="register-first-name" placeholder='Enter Your First Name' /> <br />
                <input type="text" onBlur={handleRegValues} name='lastName' id="register-last-name" placeholder='Enter Your Last Name' /><br />
                <input type="email" onBlur={handleRegValues} name='email' id="register-email" placeholder='Enter Your Email' /><br />
                <input type="password" onBlur={handleRegValues} name='passwordOne' id="register-user-pass" placeholder='Enter Your Password' /><br />
                <input type="password" onBlur={handleRegValues} name='passwordTwo' id="re-register-user-pass" placeholder='Re-enter Your Password' /><br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;