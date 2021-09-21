// import firebase from 'firebase';
import React, { Component, useState } from 'react';
import {Row,Col,Image} from "react-bootstrap";
// import {MdSend} from "react-icons/md"
import "./Comment.css"
import SendIcon from '@material-ui/icons/Send';

const CommentForm=(props)=> {

   const [body,setBody]=useState("");

  const _handleSubmit=(event)=> { 
    event.preventDefault();   // prevents page from reloading on submit

    let author = props.name;
    let currentBody = body;
    props.addComment(author, currentBody);
    setBody("");
  }
   
    
        return (
            <form style={{padding:"1%"}} className="comment-form">
            <div className="comment-form-fields" style={{position:"relative"}}>
             <Row>
                 <Image className="comment-header-image" style={{borderRadius:"100%"}} src={props.avatar} alt="Current User image"/>
                 <textarea className="input-comment" style={{width:"70%",marginTop:"10px",marginRight:"5%",marginLeft:"3%",overflow:"hidden"}} placeholder="Add a comment..." rows="1" required value={body} onChange={(e)=>setBody(e.target.value)}/>
                 <SendIcon className="post-comment" onClick={_handleSubmit} style={{color:"#2e7069",cursor:"pointer",position:"absolute",top:"37%"}}/> 
             </Row>
            </div>
          </form>
        )
    }
    

export default CommentForm;