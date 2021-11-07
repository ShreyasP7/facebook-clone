import React, { useState } from 'react'
import {Avatar} from "@material-ui/core";
import img from "../images/profile1.jpeg";
import "./MessageSender.css";
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import axios from '../axios.js';
import {useStateValue} from "../StateProvider";
import {db,storage} from "../firebase.js";
import firebase from "firebase"

const MessageSender = (props) => {
    const[input,setInput]=useState("");
    const[imageURL,setImageURL]=useState("");
    const[image,setImage]=useState(null);
    const [{user},dispatch] = useStateValue();
    function inputChange(e)
    {
        setInput(e.target.value);
        console.log(e.target.value);
    }
    function handleChange(e)
    {
        if(e.target.files[0])
        {
            setImage(e.target.files[0]);
        }
    }
    
    const handleSubmit=async(e)=>{
      
        e.preventDefault();

        if(image)
        {
            const postID=db.collection("posts").doc().id;
            const uploadTask = storage.ref(`images/${user.displayName}/${postID}/${image.name}`).put(image);
            uploadTask.on(
              "state_changed",
              snapshot => {},
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref(`images/${user.displayName}/${postID}`)
                  .child(image.name)
                  .getDownloadURL()
                  .then(url => {
                    // setUrl(url);
                    console.log(url);
                    // var currentdate = new Date(); 
                    // var date = currentdate.getDate() + "/"
                    // + (currentdate.getMonth()+1)  + "/" 
                    // + currentdate.getFullYear()
                    // console.log(date);
                    const postData = {
                        text:input,
                        user:{
                            userID:user.uid,
                            name:user.displayName,
                            avatar:user.photoURL,
                        },
                        postURL:url,
                        postID:postID,
                        timestamp:firebase.firestore.Timestamp.now(),
                        numberOfLikes:0,
                        numberOfComments:0
                    }
                    savePost(postData);
                  });
              }
            );

            
        }
        else
        {
            const postID=db.collection("posts").doc().id;
            const postData={
                text:input,
                user:{
                    userID:user.uid,
                    name:user.displayName,
                    avatar:user.photoURL,
                },
                postID:postID,
                timestamp:firebase.firestore.Timestamp.now(),
                numberOfLikes:0,
                numberOfComments:0
            }
            console.log(postData);
            // alert("Post added successfully")
            savePost(postData);
        }
        setImage(null);
        setImageURL("");
        setInput("");
    }   

    const savePost=async(postData)=>{
        // props.setPostsData([...props.postsData,postData]);
        db.collection("posts").doc(postData.postID).set(postData)
        .then(()=>{
            alert("Post Uploaded");
            window.location.reload(false);
        })
    }
    
    // {
    //    alert("Doneee");
    //    console.log("Submitted");
    // }
    return (
        <div className="messageSender">
          <div className="messageSender__top">
             <Avatar src={user.photoURL}/>
             <form onSubmit={handleSubmit}>
                 <input
                     type="text"
                     className="messageSender__input"
                     placeholder="What's On Your Mind?"
                     value={input}
                     onChange={inputChange}
                 />
                 <input
                     type="file"
                     className="messageSender__fileSelector"
                     onChange={handleChange}
                 />
                 <button type="submit" onClick={handleSubmit}>Submit</button>
             </form>
          </div>
          <div className="messageSender__bottom">
              <div className="messageSender__option">
                 <VideocamIcon style={{color:"red"}}/>
                 <h3>Live Video</h3>
              </div>
              <div className="messageSender__option">
                 <PhotoLibraryIcon style={{color:"green"}}/>
                 <h3>Photo/Video</h3>
              </div>
              <div className="messageSender__option">
                 <InsertEmoticonIcon style={{color:"orange"}}/>
                 <h3>Feeling/Activity</h3>
              </div>
          </div>
        </div>
    )
}

export default MessageSender
