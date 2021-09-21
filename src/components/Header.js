import React from 'react'
import logo from "../images/facebook-logo.png"
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForumIcon from '@material-ui/icons/Forum';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Notifications from './Notifications';
import "./Header.css"
import {useStateValue} from "../StateProvider";
import {useState,useEffect} from "react";
import {DropdownButton,Dropdown,ButtonGroup,Badge} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import {db,auth} from "../firebase";
// import {useStateValue} from "../StateProvider";


function Header() {
    
    const [{user},dispatch] = useStateValue();
    const [drop,setDrop]=useState(false);
    const[notifications,setNotifications]=useState(0);
    const [notificationSeen,setNotificationSeen]=useState(false);
    const [badgeCount,setBadgeCount]=useState(0);

    useEffect(() => {
        var count=0;
        db.collection("users").doc(user.uid).collection("notifications")
        .onSnapshot((allDocs)=>{
           
            allDocs.docs.forEach((doc)=>{
                console.log(doc.data());
                if(doc.data().hasRead===false)
                {
                   count+=1;
                   console.log(count);
                }
            })
            setBadgeCount(count);
        })
    },[notificationSeen,badgeCount])

    const logoutUser=()=>{
        auth.signOut();
    }
    
    const bellIconPressed=()=>{
        if(notificationSeen)
        {
            // document.getElementById("dropdownHeader").style.display="none";
            setNotificationSeen(false);
        }
        else
        {
            // document.getElementsByClassName("dropdown-menu")[0].style.display="inline";
            // document.getElementById("dropdownHeader").style.display="block";
            setNotificationSeen(true);
            db.collection("users").doc(user.uid).collection("notifications").get().then((allDocs)=>{
                allDocs.forEach((doc)=>{
                    console.log("Inside notifications");
                    console.log(doc.id)
                    if(doc.data().hasRead===false)
                    {
                        db.collection("users").doc(user.uid).collection("notifications").doc(doc.id).update({hasRead:true});
                    }
                })
            })
        }
    }

    

   
    

    
    return (
        <div>
        <div className="header">
           <div className="header__left">
              <img src={logo} alt="Facebook Logo"/>
           </div>
           <div className="header__input">
              <SearchIcon/>
              <input placeholder="Facebook Search"></input>
           </div>
           <div className="header__center">
              <div className="header__option header__option--active">
                  <HomeIcon fontSize="medium"/>
              </div>
              <div className="header__option">
                  <FlagIcon fontSize="medium"/>
              </div>
              <div className="header__option">
                  <SubscriptionsOutlinedIcon fontSize="medium"/>
              </div>
              <div className="header__option">
                  <StorefrontOutlinedIcon fontSize="medium"/>
              </div>
              <div className="header__option">
                  <SupervisedUserCircleIcon fontSize="medium"/>
              </div>
           </div>
           <div className="header__right">
               <div className="header__info">
                  <Avatar src={user.photoURL}/>
               </div>
               <h4 className="user-name">{user.displayName}</h4>
           </div>

           <IconButton>
                <AddIcon/>
           </IconButton>

           <IconButton>
               <ForumIcon/>
           </IconButton>

           <IconButton>
             <div className="notification-icon">
              <Dropdown as={ButtonGroup} 
                 drop="down"
              >
                 <Dropdown.Toggle id="dropdown-custom-1" style={{border:"none",backgroundColor:"white",color:"gray"}}>
            {/* <FaBell size="20" onClick={()=>this.bellIconPressed(this.state.currentUser)}/> */}
                    <NotificationsIcon style={{height:"1.3em"}} size="30" onClick={bellIconPressed}/>
            {(!notificationSeen && badgeCount>0) && <Badge pill>{badgeCount}</Badge>}
                 </Dropdown.Toggle>
                  <Dropdown.Menu className="super-colors" id="dropdownHeader">
                      <Notifications/>
                  </Dropdown.Menu>
            
               </Dropdown> 
               
                {/* <div className="num-notification">{notifications}</div> */}
             </div>
           </IconButton>

           {/* <DropdownButton id="dropdown-basic-button" title={<IconButton><ExpandMoreIcon/></IconButton>} onClick={handleDrop}>
             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
           </DropdownButton> */}

          
           <DropdownButton id="dropdown-item-button" title={<IconButton><ExpandMoreIcon/></IconButton>} style={{color:"black"}}>
                <Dropdown.Item as="button">My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={logoutUser}>Logout</Dropdown.Item>
           </DropdownButton>
           
          
        </div>
        
        
      </div>
    )
}

export default Header;
