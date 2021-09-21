import React, { Component, useEffect, useState } from 'react'
import {Image,Button} from "react-bootstrap"
import "./Comment.css"
import CommentForm from "./CommentForm"
import Comment from "./Comment"
import firebase from "firebase"
import { useStateValue } from '../StateProvider'
import {db} from "../firebase.js"



const CommentBox=(props)=>{

    const [showComments,setShowComments]=useState(false);
    const [allComments,setComments]=useState([]);
    const [buttonText,setButtonText]=useState("");
    const [{user},dispatch] = useStateValue();
    // const currentUser=firebase.auth().currentUser

    useEffect(()=>{
      // console.log("comments length")
      var comments=[]
      db.collection("posts").doc(props.postID).collection("comments").get()
      .then((allDocs)=>{
        allDocs.forEach((doc)=>{
          // console.log(doc.data());
          comments.push(doc.data())
          // console.log(comments);
        })
        // console.log(comments.length);
        setComments(comments);
        // console.log(comments.length);
        // console.log(allComments.length)
        setButtonText(`View all ${comments.length} comments`);
        if (showComments) {
          setButtonText('Hide Comments');
        }
      })
        
     },[showComments,allComments]);
   
    // componentDidMount(){
      // this.setState({comments:[]});
    //   firebase.firestore().collection("groups").doc("general").collection(this.props.typeOfPosts).doc(this.props.post.postID).collection("comments").onSnapshot((snapshotDocs)=>{
    //     snapshotDocs.docs.forEach((doc)=>{
    //        var newComments=snapshotDocs.docs.map((doc)=>doc.data());
    //        this.setState({comments:newComments});
    //     })
    //   })
    // }
     
    const _addComment=(author, body)=> {

      
      const commentID=db.collection("posts").doc(props.postID).collection("comments").doc().id;
      const commentObj={
        commentID:commentID,
        avatar:user.photoURL,
        author:author,
        body:body,
        userID:user.uid,
        numberOfLikes:0,
        timestamp:firebase.firestore.Timestamp.now()
      }
      setComments([...allComments,commentObj]);
      db.collection("posts").doc(props.postID).update({numberOfComments:allComments.length+1})
      .then(()=>{
        console.log(commentObj);
        db.collection("posts").doc(props.postID).collection("comments").doc(commentID).set(commentObj);
      })
      
    }
    
      
    //   const notificationUserRef=firebase.firestore().collection("users").doc(this.props.post.user.id).collection("notifications");
    //   const notificationCounselorRef=firebase.firestore().collection("counselors").doc(this.props.post.user.id).collection("notifications");
    //   const commentRef=firebase.firestore().collection("groups").doc("general").collection(this.props.typeOfPosts).doc(this.props.post.postID).collection("comments");

    //   let isThisCounselor=false;

    // firebase.firestore().collection("counselors").doc(this.props.post.user.id).get().then((doc)=>{
    //   if(doc.exists)
    //   {
    //       isThisCounselor=true;
    //   }
    // })

    //   const newComment=commentRef.doc();
    //   const commentID=newComment.id;

    //   const comment = {
    //     id:commentID,
    //     avatar:this.props.avatar,
    //     author,
    //     body,
    //     userID:this.state.currentUser.uid,
    //     numberOfLikes:0,
    //     timestamp:firebase.firestore.Timestamp.now()
    //   };
      
    //    const d=new Date();

    //    const alertObj={
        
    //     value:true,
    //     userId:this.state.currentUser.uid,
    //     postId:this.props.post.postID,
    //     postType:this.props.post.type,
    //     postName:this.props.post.postName,
    //     commentId:commentID,
    //     message:"User commented on your post",
    //     hasRead:false,
    //     type:"comment",
    //     notificationID:"",
    //     text:body.slice(0,27),
    //     timestamp:d.getTime()
    //  }


       
    //   commentRef.doc(commentID).set(comment)
    //   .then(()=>
    //   {
    //     console.log("Comments Successfully added into firestore");
    //     // this.setState({comments:[...this.state.comments,comment]});
    //     firebase.firestore().collection("groups").doc("general").collection(this.props.typeOfPosts).doc(this.props.post.postID).update({commentCount:this.state.comments.length})
    //     .then(()=>{
    //       if(isThisCounselor)
    //       {
  
    //        const newNotif=notificationCounselorRef.doc()
    //        const notificationID=newNotif.id;
    //        this.setState({notificationID:notificationID});
    //        alertObj.notificationID=notificationID;
    //        notificationCounselorRef.doc(notificationID).set(alertObj);
    //       }
    //       else
    //       {
    //         const newNotif=notificationUserRef.doc()
    //         const notificationID=newNotif.id;
    //         this.setState({notificationID:notificationID});
    //         alertObj.notificationID=notificationID;
    //         notificationUserRef.doc(notificationID).set(alertObj);
    //       }
    //     })
    //   })
    //   .catch(()=>console.log("Error while adding comments into firestore"))     
    
    
   
    
    const _getComments=()=>{    
      return allComments.map((comment) => { 
        return (
          <Comment 
            commentID={comment.id}
            commentUser={comment.userID}
            // post={this.props.post}
            avatar={comment.avatar}
            author={comment.author} 
            body={comment.body} 
            numberOfLikes={comment.numberOfLikes}
            timestamp={comment.timestamp}
            // history={this.props.history}
            // typeOfPosts={this.props.typeOfPosts}
            />
        ); 
      });
    }

    const _handleClick=()=> {
     
      setShowComments(!showComments);
      const comments=_getComments();
        if(!showComments)
        {
          props.commentSection(comments);
        }
        else
        {
          props.commentSection();
        }
    }

      
      return(
        <>
        <div style={{backgroundColor:"#F0F0F0"}} className="comment-box">
          <CommentForm addComment={_addComment} avatar={user.photoURL} name={user.displayName} postID={props.postID}/>
          {
            allComments.length ? 
              <Button className="button-comment" style={{backgroundColor:"#FFF",color:"black"}} id="comment-reveal" onClick={_handleClick}>
                                            {buttonText}
              </Button>:null
          }
        </div>
        </> 
      );

        }
        export default CommentBox;
     
     
      
      
     
    

 

 
