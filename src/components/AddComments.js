import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouteLoaderData } from 'react-router-dom';
import { database } from '../firebase';


export default function AddComments({userData, postData}) {
  const [text, setText] = useState()

  const handleClick = ()=>{
    let obj = {
      text: text,
      userProfileImage: userData.profileUrl,
      userName: userData.fullname
    }
    database.comments.add(obj).then((doc)=>{
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id]
      })
    })
    setText('')
  }

  return (
    <div style = {{width: "100%"}}>
      <TextField id="standard-basic" variant="standard" placeholder='add a comment' value = {text} onChange = {(e)=>setText(e.target.value)}/>
      <Button variant="outlined" style = {{marginLeft: "4%", marginTop: "-1%"}} onClick = {handleClick}>Comment</Button>
    </div>
  )
}
