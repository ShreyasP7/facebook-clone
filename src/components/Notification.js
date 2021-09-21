import React, { Component,useEffect,useState } from 'react'
import Media from 'react-bootstrap/Media'
import {Row,Col} from "react-bootstrap"
// import {FaHandsHelping} from "react-icons/fa"
// import {AiFillHeart} from "react-icons/ai"
import {db} from '../firebase.js'
// import Firebase from '../../firebase'
// import {FaArrowAltCircleUp,FaRegCommentDots} from "react-icons/fa"
// import { withRouter } from "react-router-dom";


const Notification=(props)=> {

    // constructor(props){

    //     super(props)
    //     this.state= {

    //         userName:"",
    //         image:"",
    //         message:"",
    //         // currentUser:Firebase.auth().currentUser

    //     }

    // }

    const [userName,setUserName]=useState("");
    const [image,setImage]=useState("");
    const [message,setMessage]=useState("");

    useEffect(() => {
        
    
        const notification= props.notification;
        const currentUser=props.currentUser;
        let message="";
        
        if(notification.type==="Like"){                
                    message=" liked your post"
                }
               
                else {
                    message=" commented on your post"
                }
        db.collection("users").doc(notification.userID).get()
        .then((doc)=>{
            
            if(doc.exists){

            // this.setState({
            //     userName:doc.data().name,
            //     image:doc.data().avatar,
            //     message:message
            // })
            setUserName(doc.data().name)
            setImage(doc.data().profilePic);
            setMessage(message);
        }

        })
        // firebase.firestore().collection("counselors").doc(notification.userId).get()
        // .then((doc)=>{
        //   if(doc.exists){

        //     this.setState({
        //         userName:doc.data().username,
        //         image:doc.data().avatar,
        //         message:message
        //     })
        // }

        // })
        
}, []) 



    // render() {

    //     const {image,message,userName}=this.state
    //     const {notification} = this.props

        return (
            <div style={{cursor:"pointer",padding:"2%",textAlign:"left"}}>
                    <img
                        width={40}
                        height={40}
                        className="mr-3"
                        src={image}
                        alt="Generic placeholder"
                        style={{borderRadius:"50%"}}
                    />
                    <div style={{fontSize:"12px",display:"inline",position:"relative",bottom:"15px",marginLeft:"15px"}}>    
                        <b>{userName}</b>
                        {message}
                    </div>

            </div>
        )
    }
// }

export default Notification;
