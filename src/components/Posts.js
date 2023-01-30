import React, {useState, useEffect} from 'react'
import {database} from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import { connectStorageEmulator } from 'firebase/storage';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'

export default function Posts({user}) {
  const [posts, setPosts] = useState(null)

  useEffect(()=>{
    let posts_arr = []
    const unsub = database.posts.orderBy('created_at', 'desc').onSnapshot((querySnapshot)=>{
      posts_arr = [];
      querySnapshot.forEach((doc)=>{
        let data = {...doc.data(), postId: doc.id};
        posts_arr.push(data);
      })
      setPosts(posts_arr)
    })
    return unsub
  },[])

  return (
    <div>
      {
        posts === null
        ? <CircularProgress color="success"/>
        : <div className='video-container'>
          {
            posts.map((post, index)=>{
              return(
               <React.Fragment key = {index}>
                <div className='videos'>
                 <Video src = {post.pUrl}/>
                  <div className='fa' style = {{display: "flex"}}>
                    <Avatar src={user.profileUrl} />
                    <h4>{user.fullname}</h4>
                  </div>
                  <Like userData = {user} postData = {post}/>
                </div>
               </React.Fragment>
            )})
          }
          </div>
      }
    </div>
  )
}
