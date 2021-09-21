import React from 'react'
import Story from './Story'
import profilePic1 from '../images/profile1.jpeg';
import profilePic2 from '../images/profile2.jpeg';
import profilePic3 from '../images/profile3.jpeg';
import story1 from '../images/wal-1.jpg';
import story2 from '../images/wal-2.jpeg';
import story3 from '../images/wal-3.jpeg';
import "./StoryReel.css"

const StoryReel = () => {
    return (
        <div className="storyReel">
            <Story image={story1} profilePic={profilePic1} title="Enjoying"/>
            <Story image={story3} profilePic={profilePic3} title="Just busyyy"/>
            <Story image={story2} profilePic={profilePic2} title="Having Fun"/>
            <Story image={story3} profilePic={profilePic3} title="Just busyyy"/>
            <Story image={story1} profilePic={profilePic1} title="Enjoying"/>
        </div>
    )
}

export default StoryReel
