import React, { Component } from 'react'
import "./Comment.css";
import {Row,Col,Image} from "react-bootstrap"
// import moment from "moment";
// import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import firebase, { firestore } from 'firebase';

export default class Comment extends Component {

  constructor(props){

    super(props)
    this.state={
          like:false,
          commentID:this.props.commentID,
          numberOfLikes:this.props.numberOfLikes,
          currentUser:firebase.auth().currentUser,
          timestamp:this.props.timestamp,
          notification:""    
    }

}
// componentDidMount(){
//   if(this.state.currentUser){
//       firebase.firestore().collection("groups").doc("general").collection(this.props.typeOfPosts).doc(this.props.post.postID).collection("comments").doc(this.state.commentID)
//       .collection("likes").doc(this.state.currentUser.uid)
//       .get()
//       .then((docSnapshot)=>{
//         if(docSnapshot.exists)
//         {
          
//           this.setState({like:true});
//         }
//       })
//     }
// }
 handleLikes=()=>{                                                             
//     const {currentUser,like}=this.state;
//     const notificationUserRef=firebase.firestore().collection("users").doc(this.props.commentUser).collection("notifications");
//     const notificationCounselorRef=firebase.firestore().collection("counselors").doc(this.props.commentUser).collection("notifications");
//     const commentRef=firebase.firestore().collection("groups").doc("general").collection(this.props.typeOfPosts).doc(this.props.post.postID).collection("comments").doc(this.state.commentID);
//     const likeRef=commentRef.collection("likes").doc(currentUser.uid)

//     let isThisCounselor=false;

//     firebase.firestore().collection("counselors").doc(this.props.commentUser).get().then((doc)=>{
//       if(doc.exists)
//       {
//           isThisCounselor=true;
//       }
//     })

//     if(!like){
//        const likeObj={
//       userName:currentUser.displayName,
//       userID:currentUser.uid,
//       userAvatar:currentUser.photoURL,
//       like:true,
//       timestamp:firebase.firestore.Timestamp.now()
//      }

//      const d=new Date();
     
//      const alertObj={
              
//       value:true,
//       userId:this.state.currentUser.uid,
//       postId:this.props.post.postID,
//       postType:this.props.post.type,
//       postName:this.props.post.postName,
//       commentId:this.state.commentID,
//       message:"User liked your comment",
//       hasRead:false,
//       type:"likedComment",
//       notificationID:"",
//       text:this.props.body.slice(0,27),
//       timestamp:d.getTime()
//      }

      

//      this.setState({numberOfLikes:this.state.numberOfLikes+1,like:true})
//      commentRef.update({numberOfLikes:this.state.numberOfLikes+1})
//      .then(()=>{
//       likeRef.set(likeObj).then(()=>{
//         if(isThisCounselor)
//         {

//          const newNotif=notificationCounselorRef.doc()
//          const notificationID=newNotif.id;
         
//          alertObj.notificationID=notificationID;
//          notificationCounselorRef.doc(notificationID).set(alertObj);
//          this.setState({notification:alertObj});
//         }
//         else
//         {
//           const newNotif=notificationUserRef.doc()
//          const notificationID=newNotif.id;
        
//          alertObj.notificationID=notificationID;
//          notificationUserRef.doc(notificationID).set(alertObj);
//          this.setState({notification:alertObj});
//         }
//       })
//      })
    
  
//    }
//    else
//    {
//     console.log(this.state.notification);
//     this.setState({numberOfLikes:this.state.numberOfLikes-1,like:false})
//     commentRef.update({numberOfLikes:this.state.numberOfLikes-1})
//     .then(()=>{
//      likeRef.delete().then(()=>{
//         if(isThisCounselor)
//         {
//           notificationCounselorRef.doc(this.state.notification.notificationID).delete();
//         }
//         else
//         { 
//           notificationUserRef.doc(this.state.notification.notificationID).delete();
//         }
//      })
//     })
//   }
 }

 getAlertObj=()=>{
  
 }

 timeFromNow = timestamp => {
  let time = new Date(timestamp.toDate());
//   return moment(time).fromNow();
 }
 userNotLoggedIn=()=>{
  localStorage.setItem("previousUrl","mentalhealth");
  this.props.history.push("signin");
}

    render() {
      const {numberOfLikes}=this.state;
        return (
            <div className="comment">
                <Row>
                  {/* <Col lg={1} md={1} xs={2} className="comment-user-image-col"> */}
                  <Image style={{textAlign:"center",borderRadius:"100%"}} className="comment-user-image" src={this.props.avatar} roundedCircle/>
                  {/* </Col>   
                  <Col lg={11} md={11} xs={10} style={{paddingLeft:"0px"}}>        */}
                  <p style={{display:"inline",position:"relative",bottom:"10px",marginLeft:"10px"}}><strong>{this.props.author}</strong><span className="comment-body"> {this.props.body}</span></p>
                  {/* </Col>  */}
                </Row>
                <Row style={{marginTop:"5px",color:"#6d6e88"}}>
                  <Col style={{}}>
                    <p className="comment-timestamp">{this.timeFromNow(this.props.timestamp)}</p>
                    <p style={{display:"inline"}}>
                  <span onClick={this.state.currentUser?()=>this.handleLikes():()=>this.userNotLoggedIn()}>
                     {/* {this.state.like? <AiFillHeart color="red"/>:<AiOutlineHeart color="red"/>} */}
                  </span>{numberOfLikes>0? numberOfLikes + " likes":numberOfLikes+" like"}</p>
                  </Col>
                </Row>
            </div>
        )
    }
}
