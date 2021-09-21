import { useEffect } from 'react';
import './App.css';
import Feed from './components/Feed';
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import Widget from './components/Widget';
import Login from "./components/Login"
import {useStateValue} from "./StateProvider";
import {db,auth} from "./firebase"

function App() {

  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...


    auth.onAuthStateChanged(async(authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        // const user = await db.collection('users').doc(authUser.uid).get();
        // console.log(user.data().id);
        dispatch({
          type:"SET_USER",
          user:authUser
        });
      }
       else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  
  return (
    !user ? <Login/> :
    <div className="app" style={{maxWidth:"100vw",height:"100vh",overflow:"hidden"}}>
      <Header/>
      {/* <h1>Facebook React</h1> */}
      <div className="app__body">
        <Sidebar/>
        <Feed className="feed"/>
        <Widget/>
      </div>
    </div>
  );
}

export default App;
