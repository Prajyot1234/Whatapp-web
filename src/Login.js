import React from 'react';
import "./Login.css";
import { auth,provider } from "./firebase";
import { useDataLayerValue } from "./DataLayer"; 

function Login() {
    const [{},dispatch] = useDataLayerValue();
    
    const Login= ()=> {
        auth.signInWithPopup(provider)
        .then(result =>{
            dispatch({
                type : "SET_USER" ,
                user : result,
            })
        })
        .catch(error => (alert(error.message)))
    }

    return (
        <div className="login_page">
        <div className="Login_page_box">
            <h1 className="login_page_h1">Chat-System</h1>
            <h2 className="login_page_h2">Sign In With Google Accounts </h2>
            <button onClick={Login} className="Login_page_button">Sign In with Google</button>
        </div>        
        </div>
    )
}

export default Login;
