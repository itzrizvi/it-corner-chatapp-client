import React, { useState } from 'react';
import { Link } from 'react-router-dom';

let user;

const Login = () => {

    // const [userData, setUserData] = useState([]);
    // const [givenEmail, setGivenEmail] = useState("");
    // const [givenPassword, setGivenPassword] = useState("");
    const [name, setName] = useState("");

    
    // async function logedUser(e){
    //     e.preventDefault();
    //     const userEmail = document.getElementById("email").value;
    //     await fetch(`http://localhost:5000/users/${userEmail}`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setUserData(data);
           
    //     });

    //     const {email, passwordOne} = userData;
    //     // console.log(firstName)

    //     if(givenEmail === email && givenPassword===passwordOne){
    //         console.log('Matched');
    //     }else{
    //         console.log('Not Matched')
    //         alert('Your Email or Password didn\'t Matched')
    //     }

    // }

    user = name;

    
    return (
        <div>
            <h2>Login Here</h2>
            {!name && <p>Please Enter Your User Name</p>}
            <form className="login-form">
                
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='Enter your email please...' required />
                
                {/* <input onBlur={(e) => setGivenEmail(e.target.value)} type="email" id="email" placeholder='Enter your email please...' required /> */}

                {/* <input onBlur={(e) => setGivenPassword(e.target.value)} type="password" id="password" placeholder='Enter your password please...' required /> */}

                <Link to="/chatapp">
                    <button type='submit'  className='login-btn'>Login</button>
                </Link>
                
            </form>
            <Link to='/register'>Don't have an account? Register Here</Link>
        </div>
    );
};

export default Login;
export { user };

