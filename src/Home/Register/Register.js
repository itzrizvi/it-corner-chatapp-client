import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [registerData, setRegisterData] = useState({});
    const [userAdded, setUseradded]= useState(false);
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

        fetch('http://localhost:5000/users', {
            method:'POST',
            headers:{
                'content-type':'application/json', 
            },
            body: JSON.stringify(registerData)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                setUseradded(true);
                setTimeout(() => {
                    setUseradded(false);
                }, 3000);
            }
        })
    }

    return (
        <div>
            <h2>Register Here</h2>
            {userAdded && <p className='user-added' style={{color:"green"}}>You are registered successfully</p>}
            <form onSubmit={regitrationHandler}  className='registration-form'>
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