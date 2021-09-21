import React from 'react'
import "./Sidebar.css";
import logo from "../images/facebook-logo.png"
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import SidebarRow from './SidebarRow';
import userImage from "../images/wal-1.jpg";
import {useStateValue} from "../StateProvider";


const Sidebar = () => {
    const [{user},dispatch] = useStateValue();
    return (
        <div className="sidebar">
           <SidebarRow src={user.photoURL} title="Shreyas Poojari" />
           <SidebarRow Icon={LocalHospitalIcon} title="COVID-19 Information Centre"/>
           <SidebarRow Icon={EmojiFlagsIcon} title="Pages"/>
           <SidebarRow Icon={PeopleIcon} title="Friends"/>
           <SidebarRow Icon={ChatIcon} title="Messenger"/>
           <SidebarRow Icon={StorefrontIcon} title="Marketplace"/>
           <SidebarRow Icon={VideoLibraryIcon} title="videos"/>
           <SidebarRow Icon={ExpandMoreOutlinedIcon} title="More"/>
        </div>
    )
}

export default Sidebar
