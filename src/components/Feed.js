// import { PostAdd } from '@material-ui/icons'
import React, { useState,useEffect } from 'react'
import MessageSender from './MessageSender'
import StoryReel from './StoryReel'
import Post from "./Post"
import profilePic from "../images/profile1.jpeg"
import "./Feed.css"
import {db} from "../firebase.js"

const Feed = () => {

    
    const [profilePic,setProfilePic]=useState('');
    const [postsData,setPostsData]=useState([]);

    useEffect(()=>{

        var unsubscribe=db.collection("posts").orderBy("timestamp","desc").onSnapshot((allDocs)=>{
            var allPosts=[];
            allDocs.forEach((doc)=>{
                console.log(doc.data());
                allPosts.push(doc.data());
                
              })
              setPostsData(allPosts);
        })
        return () => {
            unsubscribe();
        };
    },[])
   

   
    

    return (
        <div className="feed" style={{maxHeight:"calc(100vh - 100px)",overflowY:"scroll",overflowX:"hidden"}}>
            {/* Story
            MessageSender
            Posts */}
            <div className="feed__top">
               <StoryReel/>
            </div>
            
            <MessageSender setPostsData={setPostsData} postsData={postsData}/>
             {
                console.log("Inside"+postsData)
             }
            <div>
                { postsData.map((entry,index) => (
                    <Post
                        userID={entry.user.userID}
                        index={index}
                        profilePic={entry.user.avatar}
                        message={entry.text}
                        timestamp={entry.timestamp}
                        postURL={entry.postURL}
                        postID={entry.postID}
                        userName={entry.user.name}
                        numberOfLikes={entry.numberOfLikes}
                        numberOfComments={entry.numberOfComments}
                    />
                ))
                } 
            </div>
                     
        </div>
    )
}

export default Feed

