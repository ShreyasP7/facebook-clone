import React, { Component, useState,useEffect} from 'react'
import  Spinner  from 'react-bootstrap/Spinner';
// import Firebase from '../../firebase'
import Notification from './Notification'
import "./Notifications.css"
import {useStateValue} from "../StateProvider";
import {db} from "../firebase.js"

const Notifications=()=>{

    // constructor(){
    //     super()
    //     this.state={
    //         notifications:[],
    //         // currentUser:Firebase.auth().currentUser,
    //         listeners: [],
    //         // usersRef:Firebase.database().ref("users"),
    //         notificationsLoading:true
    //     }
    // }
    const [{user},dispatch] = useStateValue();
    const [notifications,setNotifications]=useState([]);
    const [notificationsLoading,setNotificationsLoading]=useState(true);



    useEffect(() => {
      
   

        // const {currentUser} = this.state;
        let newNotifications=[]
        var unsubscribe=db.collection("users").doc(user.uid).collection("notifications").onSnapshot((snapshotDocs)=>{
                  newNotifications=snapshotDocs.docs.map((doc)=>doc.data());
                    
                   
                    // this.setState({notifications:newNotifications});
                    setNotifications(newNotifications);
                    setNotificationsLoading(false);
                    // this.setState({notificationsLoading:false})
                 })

               return () => {
                  unsubscribe();
              };

        // firebase.firestore().collection("counselors").doc(currentUser.uid).get()
        // .then((doc)=>{
        //     if(doc.exists)
        //     {
        //       firebase.firestore().collection("counselors").doc(currentUser.uid).collection("notifications").onSnapshot((snapshotDocs)=>{
        //         newNotifications=snapshotDocs.docs.map((doc)=>doc.data());
                  
                 
        //           this.setState({notifications:newNotifications});
        //           this.setState({notificationsLoading:false})
        //        })
        //       console.log("Counselor is"+this.state.isUserCounselor);
        //     }
        //     else
        //     {
        //       firebase.firestore().collection("users").doc(currentUser.uid).collection("notifications").onSnapshot((snapshotDocs)=>{
        //         newNotifications=snapshotDocs.docs.map((doc)=>doc.data());
                  
                 
        //           this.setState({notifications:newNotifications});
        //           this.setState({notificationsLoading:false})
        //        })
        //     }
        // })


      }, [])

    // componentWillUnmount() {
        
    //   }
    


      const compare = (p1, p2) => {

        const t1= p1.timestamp;
        const t2= p2.timestamp;

        let comparison =0

        if(t1>t2){
          comparison=-1
        }
        else{
          comparison=1
        }

        return comparison

      }



    const displayNotifications = notifications =>{

      
      notifications.sort(compare)
      

      return  notifications.length > 0 &&
        notifications.map(notification => (
          <Notification
            currentUser={user}
            key={notification.timestamp}
            notification={notification}
          />
        ));
}

    // render() {

    //     const {notificationsLoading,notifications}=this.state

        return (
            <div className="notification-parent" style={{backgroundColor:"white",top:"20px"}}>

                <div className="notification-child"> <span> Notifications </span> </div>

                {notificationsLoading|| notifications.length===0 ? 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">No Notifications</span>
                    </Spinner>
                
                :
                   
                   displayNotifications(notifications)
                }
                
            </div>
        )
    }
// }

export default Notifications
