import React, { useState } from 'react';
import { Link } from 'react-router-dom';

let user;

const Login = () => {

    const [name, setName] = useState("");
    const logedUser = () => {
        user = document.getElementById("name").value;

        // fetch('http://localhost:5000/users/admin@admin.com')
        // .then(res=>res.json())
        // .then(data=>console.log(data))
    }
    return (
        <div>
            <h2>Login Here</h2>
            {!name && <p>Please Enter Your User Name</p>}
            <form className="login-form">
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='your name please' required />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chatapp">
                    <button onClick={logedUser} className='login-btn'>Login</button>
                </Link>
            </form>
            <Link to='/register'>Don't have an account? Register Here</Link>
        </div>
    );
};

export default Login;
export { user };

