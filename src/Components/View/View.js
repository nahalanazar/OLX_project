import React, {useEffect, useState, useContext} from 'react';
import { collection, where, query, getDocs } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const {firestore} = useContext(FirebaseContext)
  // useEffect(() => {
  //   const {userId} = postDetails
  //   getDoc(doc(firestore, 'users', where('id', '==', userId))).then((res) => {
  //     res.forEach(doc => {
  //        setUserDetails(doc.data())
  //      })
  //    })
  // })

  useEffect(() => {
    const { userId } = postDetails;
    const userQuery = query(collection(firestore, 'users'), where('id', '==', userId));
    
    getDocs(userQuery).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         setUserDetails(doc.data());
       });
     });
  },[]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{ postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails &&
          <div className="contactDetails">
          <p>Seller details</p>
          <p>{ userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;
