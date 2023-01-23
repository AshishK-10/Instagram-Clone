import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../Context/authContext'
import UploadFile from './UploadFile'
import { collection, doc, getDocs } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { database, storage } from '../firebase';
export default function Feed() {

  const {user, logout} = useContext(AuthContext)
  const [currUser, setCurrUser] = useState(null)
  const db = getFirestore();
  const usersCollection = collection(db, "users")

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setCurrUser(snapshot.data())
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
      {currUser != null && <UploadFile user = {currUser}/>}
      <h1>{currUser && currUser.user_id && currUser.email}</h1>
    </div>
  )
}
