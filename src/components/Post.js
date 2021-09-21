import { Avatar } from '@material-ui/core'
import React, { useState,useEffect} from 'react';
import "./Post.css"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
// import axios from '../axios';
import {useStateValue} from "../StateProvider";
import {db} from "../firebase"
import CommentBox from "./CommentBox"
import firebase from "firebase";
// import {syncFeed} from "./Feed"

const Post = ({index,profilePic,message,timestamp,userName,numberOfLikes,numberOfComments,postURL,postID,userID}) => {

    // const[like,setLikes]=useState(likes);

    const [{user},dispatch] = useStateValue();
    const [liked,setLiked]=useState(false);
    const [numberLikes,setNumberLikes]=useState(numberOfLikes);
    const [displayComments,setDisplayComments]=useState(false);
    const [commentNodes,setCommentNodes]=useState([]);
    const [notificationID,setNotificationID]=useState("");
    // const currentUser=firebase.auth().currentUser;
    let response;
    console.log(timestamp)

    useEffect(()=>{
    db.collection("posts").doc(postID).get()
    .then((currentDoc)=>{
      setNumberLikes(currentDoc.data().numberOfLikes)
      db.collection("posts").doc(postID).collection("likes").doc(user.uid).get()
      .then((doc)=>{
          if(doc.exists)
          {
              setLiked(true);
          }
      })
    });
    db.collection("users").doc(user.uid).collection("notifications").get().then((allDocs)=>{
        allDocs.forEach((doc)=>{
            if(doc.data().postID===postID)
            {
                setNotificationID(doc.id);
            }
        })
    })
    },[])
    
    

    function handleLike(event){
            
            const notifRef=db.collection("users").doc(userID).collection("notifications");
            
            if(!liked){
                const notification_ID=notifRef.doc().id;
                setNotificationID(notification_ID);
                setLiked(true);
                setNumberLikes(numberLikes+1);
                const likeObj={
                    userID:user.uid,
                    userName:user.displayName,
                    timestamp:firebase.firestore.Timestamp.now()
                 }
            
            
            
            const notifObj={
                userID:user.uid,
		        postID:postID,
                message:"User liked your post",
		        hasRead:false,
                type:"Like",
                notificationId:notification_ID,
                timestamp:firebase.firestore.Timestamp.now()
            }
            db.collection("posts").doc(postID).update({numberOfLikes:numberLikes+1})
            .then(()=>{
                console.log(notification_ID);
                db.collection("posts").doc(postID).collection("likes").doc(user.uid).set(likeObj).then(()=>{
                    notifRef.doc(notification_ID).set(notifObj);
                })
            })
         }
         else
         {
             setLiked(false);
             setNumberLikes(numberLikes-1);
             db.collection("posts").doc(postID).update({numberOfLikes:numberLikes-1})
             .then(()=>{
                 console.log(notificationID);
                 db.collection("posts").doc(postID).collection("likes").doc(user.uid).delete().then(()=>{
                     notifRef.doc(notificationID).delete();
                 });
             })
         }
            
       }

    const updatePost=(like,id,likedUsers)=>{
        // axios.patch("/post",{_id:id,likes:like,likedBy:likedUsers}).then(res=>{
        //     console.log("data updated with likes");
        //     // setLikes(like+1);
        //     // console.log(syncFeed());
        //     setLiked(true);


        //     syncFeed();
        //     var numOfNotifications; 
        //     db.collection("users").doc(userID).get()
        //     .then((doc)=>
        //        {
        //            numOfNotifications=doc.data().numOfNotifications;
        //            db.collection("users").doc(userID).update({numOfNotifications:numOfNotifications+1})
        //            .then(()=>console.log("Notif succesfully updated"))
        //        }
        //     )
        //     .catch((error)=>
        //        console.log("Error occured while calc notif"+error)
        //     )
            // setPostsData(res.data);
            // console.log(res.data);
    //    }) 
        // alert("Post Uploaded");
    }
    const openComments = (index) => {

        console.log(index);
  
        // const {displayComments} = this.state
      
      
        if(!displayComments)
        {
        
          document.getElementsByClassName("comment-list")[index].style.width = "100%";
          document.getElementsByClassName("comment-list")[index].style.height = "100%";
          document.getElementsByClassName("comment-list")[index].style.display = "block";
          
          
        //   this.setState({displayComments:true})
         setDisplayComments(true);

        //   console.log(displayComments+this.state.post);
           
        }
        else
        {
          document.getElementsByClassName("comment-list")[index].style.width = "0px";
          document.getElementsByClassName("comment-list")[index].style.height = "0px";
          document.getElementsByClassName("comment-list")[index].style.display = "none";
          
        //   this.setState({displayComments:false})
        setDisplayComments(false);
        //   console.log(displayComments+this.state.post);
        }
        
      }

      const commentSection=(commentNodes)=>{
        console.log("Inside Comment update");
        console.log(commentNodes);
        setCommentNodes(commentNodes);
      }


    return (
        <div className="post">
           <div className="post__top">
              <Avatar src={profilePic} className="post__avatar"/>
              <div className="post__topInfo">
                  <h3>{userName}</h3>
                  <p>{new Date(timestamp.seconds * 1000).toUTCString()}</p>
                  
              </div>
           </div>
           <div className="post__bottom">
               <p>{message}</p>
           </div>

           {
               postURL? (
                   <div className="post__image">
                            <img src={postURL} style={{width:"650px",height:"350px"}}/>
                   </div>
               ): console.log("No image present in this post")

           }
           <div className="post__options">
                      <div className="post__option">
                          <ThumbUpIcon onClick={handleLike} className={liked&&"likedTrue"}/>
                          <p>{numberLikes+" "}Like</p>
                      </div>
                      <div className="post__option" onClick={()=>openComments(index)}>
                          <ChatBubbleOutlineIcon/>
                          <p>Comment</p>
                      </div>
                      <div className="post__option">
                          <NearMeIcon/>
                          <p>Share</p>
                      </div>
                      <div className="post__option">
                          <AccountCircleIcon/>
                          <ExpandMoreOutlinedIcon/>
                      </div>
            </div>
            <div className="comment-list" style={{color:"black",width:"0px",height:"0px",display:"none"}}>
                        <CommentBox commentSection={commentSection} commentNodes={commentNodes} postID={postID} numberOfComments={numberOfComments}/>
            </div> 
            <div className="all-comments">
                   {commentNodes}
            </div>

            
        </div>
    )
}

export default Post
