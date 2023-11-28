import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { app } from '../../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
// import db from '../../firebase/config'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { firestore } = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const storage = getStorage(app);
        const storageRef = ref(storage, `/image/${image.name}`);

        // 1. Upload the image to Firebase Storage
        await uploadBytes(storageRef, image);

        // 2. After the upload is successful, get the download URL
        const url = await getDownloadURL(storageRef);
        console.log(url);

        await addDoc(collection(firestore, 'products'), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
        });
      navigate('/')
    } catch (error) {
        console.error("Error in handleSubmit:", error.message);
    }
};


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
