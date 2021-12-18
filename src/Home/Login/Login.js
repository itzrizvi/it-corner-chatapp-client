import React, { useState } from 'react';
import { Link } from 'react-router-dom';

let user;

const Login = () => {

    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const logedUser = (e) => {
        e.preventDefault();
        const userEmail = document.getElementById("email").value;
        // const userPassword = document.getElementById("password").value;

        fetch(`http://localhost:5000/users/${userEmail}`)
        .then(res=>res.json())
        .then(data=>{
            setUserData(data);
           
        });
        
    }

    

   
    return (
        <div>
            <h2>Login Here</h2>
            {!email && <p>Please Enter Your User Name</p>}
            <form className="login-form">
                
                <input onBlur={(e) => setEmail(e.target.value)} type="email" id="email" placeholder='Enter your email please...' required />
                <input onBlur={(e) => setPassword(e.target.value)} type="password" id="password" placeholder='Enter your password please...' required />
                {/* <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='your name please' required /> */}

                <button onClick={logedUser} className='login-btn'>Login</button>


            </form>
            <Link to='/register'>Don't have an account? Register Here</Link>
        </div>
    );
};

export default Login;
export { user };

