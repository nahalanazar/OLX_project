import React, {useContext, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseContext, AuthContext } from './store/Context';
import { auth } from './firebase/config'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/PostContext';


function App() {
  const {setUser} = useContext(AuthContext)
  // const { firestore } = useContext(FirebaseContext)
  useEffect(() => {
    // onAuthStateChanged(): to check the user is logged in or not. the user data will lose only after logout. all those things are managed by firebase itself;
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <Post>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Signup />} path='/signup' />
            <Route element={<Login />} path='/login' />
            <Route element={<Create />} path='/create' />
            <Route element={<View />} path='/view' />
          </Routes>
        </Post>
      </Router>
    </div>
  );
}

export default App;
