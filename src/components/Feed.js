import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../Context/authContext'
import UploadFile from './UploadFile'
import Navbar from './Navbar'
import { collection, doc, getDocs } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { database, storage } from '../firebase';
import Posts from './Posts'

export default function Feed() {

  const {user, logout} = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState(null)
  const db = getFirestore();
  const usersCollection = collection(db, "users")

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setCurrentUser(snapshot.data())
    })
    return ()=> {unsub();}
  },[user])

  return (
    <>
      {currentUser && <Navbar userData = {currentUser}/>}
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <UploadFile user = {currentUser}/>
        <Posts user = {currentUser}/>
      </div>
    </>
  )
}
