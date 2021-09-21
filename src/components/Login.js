import { Button } from '@material-ui/core';

import React from 'react';
import './Login.css';
import firstImg from "../images/facebook-up-logo.png";
import secondImg from "../images/facebook-down-logo.png";
// import {useStateValue} from "../StateProvider";
import {useEffect} from "react";
import {db} from "../firebase";
import { auth, provider } from '../firebase'
import { useStateValue } from '../StateProvider'
// import { actionTypes } from '../Reducer'

const Login = () => {
    // const [state, dispatch] = useStateValue()
    const [{user},dispatch] = useStateValue();
    
//    useEffect(
//      auth
//        .onAuthStateChanged()  
//     , [])

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            // var credential = result.credential;/
            // var user = result.user;
            // const user=result.user;
            console.log(result);
            console.log("Inside login");
            // console.log(user);
            const currentUser=result.user;
            const userRef=db.collection("users").doc(currentUser.uid);

            userRef.get().then((doc)=>{
              if(!doc.exists){
                console.log(doc.exists);
                userRef.set({
                    name:currentUser.displayName,
                    profilePic:currentUser.photoURL,
                    email:currentUser.email,
                    numberOfNotifications:0
                })
              }
            })
         })
       }
    return (
        <div className='login' >
            <div className="login__logo">
                <img src={firstImg} alt="fb circle" />
                <img src={secondImg} alt="fb text"/>
            </div>
            <Button type='submit' onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login