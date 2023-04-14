import React, { useState } from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState([]);

    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => console.log(error))
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                console.log('Sing Out success');
            })
    }
    // console.log(user);
    return (
        <div>
            {
                user ? 
                <div>
                    <button onClick={handleSignOut}>Sing Out</button>
                    <h2>Name: {user.displayName}</h2>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
                : 
                <button onClick={handleGoogleAuth}>Google Login</button>
            }
        </div>
    );
};

export default Login;