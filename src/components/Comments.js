import React, {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase';

export default function Comments({postData}) {
  const [comments, setComments] = useState(null)

  useEffect(()=>{
    async function fetchData(postData){
    let arr = []
    for(let i = 0; i < postData.comments.length; i++)
    {
      let data = await database.comments.doc(postData.comments[i]).get()
      arr.push(data.data())
    }
    setComments(arr)
    }
    fetchData(postData);
  }, [postData])

  return (
    <div className='comments-div'>
      {
       comments === null ?
       <CircularProgress color="success"/>
       :
       <div style={{overflow: "auto", height: "55vh"}}>
       {
        comments.map((comment, index)=> (
            <div style = {{display: "flex", marginTop: "8%"}} key = {index}>
              <Avatar src = {comment.userProfileImage}  sx={{ width: 32, height: 32}} style = {{position: "relative"}}/>
             <div style={{marginLeft:"10px",marginTop:"-11px",maxWidth:"250px",wordBreak:"break-all"}}>
             <span style ={{fontWeight: "bold"}}>{comment.userName}</span>
              <div className='user-comment' >
                {comment.text}
              </div>
             </div>
            </div>
        ))
      }
       </div>
      }
    </div>
  )
}
