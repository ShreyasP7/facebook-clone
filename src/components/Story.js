import React from 'react'
import {Avatar} from "@material-ui/core";
import "./Story.css"


const Story = ({image,profilePic,title}) => {

    const backImg={
        backgroundImage:'url('+image+')'
    }
    return (
        <div style={backImg} className="story">
            <Avatar src={profilePic} className="story__avatar"/>
            <h4>{title}</h4>
        </div>
    )
}

export default Story
