import React, { useEffect, useState } from  "react"
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { About } from './About';
import { Users } from "./Users";
import Auth from "./Auth";
import { CardList } from './Cards';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useUserContext } from "../context/userContext";

function App(props) {
  const { user, loading, error } = useUserContext();
  const [state, setState] = useState({ posts: [] })
  const [users, setUsers] = useState({ users: [] })
  // console.log(users)
  
  //filtering
  const applyFilter = (traitName) => {
    let newPostsArray = state.filter((post) => {
      post.trait = traitName;
    });
    
    setState(newPostsArray);
  };

  const db = getDatabase();
  //loads posts from firebase db
  useEffect(() => {
    const exampleRef = ref(db, "allPosts");
    const offFunction = onValue(exampleRef, (snapshot) => {
      const allPosts = snapshot.val();
      const postKeyArray = Object.keys(allPosts);
      const postsArray = postKeyArray.map((postKey) => {
        const thePostCopy = { ...allPosts[postKey], firebaseKey: postKey };
        return thePostCopy;
      })
      setState(postsArray);
    })
    function cleanup() {
      offFunction();
    }
    return cleanup;
  }, [db]);

 //loads posts from firebase db
 useEffect(() => {
  const exampleRef = ref(db, "users");
  const offFunction = onValue(exampleRef, (snapshot) => {
    const allUsers = snapshot.val();
    const userKeyArray = Object.keys(allUsers);
    const userArray = userKeyArray.map((postKey) => {
      const theUserCopy = { ...allUsers[postKey], firebaseKey: postKey };
      return theUserCopy;
    })
    setUsers(userArray);
  })
  function cleanup() {
    offFunction();
  }
  return cleanup;
}, [db]);

  // {error && <p className="error">{error}</p>}
  // { loading ? <h2>Loading...</h2> : <> {user ? <CardList /> : <Auth />} </> }

  return (
    
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route exact path="/" element={<CardList post={state} filterCallback={applyFilter}   />} setState={setState} />
      </Routes>
      <Routes>
        <Route exact path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route exact path="/users" element={<Users users={users} setUsers={setUsers} />} />
      </Routes>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
