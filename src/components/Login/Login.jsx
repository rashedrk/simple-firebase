import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [user, setUser] = useState(null);

    const handleGoogleAuth = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => console.log(error))
    };

    const handleGithubAuth = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const loggedUser = result.user;
                setUser(loggedUser);
            })
            .catch(error => console.log(error))
    };

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
                <>
                    <button onClick={handleGoogleAuth}>Google Login</button>
                    <button onClick={handleGithubAuth}>Github Login</button>
                </>
            }
        </div>
    );
};

export default Login;