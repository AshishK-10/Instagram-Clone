import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../Context/authContext'
import UploadFile from './UploadFile'
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
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <div style={{width: "50%"}}>
      <h1>hello this is the feed</h1>
      <button onClick={logout}>
        Logout
      </button>
      </div>
      <UploadFile user = {currentUser}/>
      <Posts user = {currentUser}/>
    </div>
  )
}
