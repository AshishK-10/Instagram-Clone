import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouteLoaderData } from 'react-router-dom';
import { database } from '../firebase';
import Alert from '@mui/material/Alert';

export default function AddComments({userData, postData}) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleClick = ()=>{

    if(text === undefined || text === '')
    {
      setError('Comment is empty!');
      setTimeout(()=>{
        setError('');
      }, 2000)
      return;
    }

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
    <div className='addToCommentsDiv' style = {{width: "100%"}}>
      {error !== '' && <Alert severity="warning">{error}</Alert>}
      <TextField id="standard-basic" variant="standard" placeholder='add a comment' value = {text} onChange = {(e)=>setText(e.target.value)}/>
      <Button  className='addToCommentsBtn' variant="outlined"  style = {{marginLeft: "4%", marginTop: "-1%"}} onClick = {handleClick}>Comment</Button>
    </div>
  )
}
