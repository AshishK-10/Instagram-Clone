import React, {useState, useEffect} from 'react'
import {database} from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ModalLike from './LikeInComments'
import AddComments from './AddComments'
import Comments from './Comments'

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

  const [open, setOpen] = useState('')
  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen('');
  };

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
                      <Avatar src= {user.profileUrl} />
                      <h4>{user.fullname}</h4>
                    </div>
                    <Like userData = {user} postData = {post}/>
                    <ChatBubbleIcon style = {{color: "darkgrey"}}className='chat-styling' onClick={()=>handleClickOpen(post.pID)}/>
                    <Dialog
                      open={open === post.pID}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      hideBackdrop = {true}
                      fullWidth = {true}
                      maxWidth = 'md'
                    >

                    <div className='modal-container'>
                      <div className='video-modal'>
                        <video autoPlay = {true} muted = "muted" controls style={{background: "black"}}>
                          <source src = {post.pUrl} style = {{objectFit: "cover"}}/>
                        </video>
                      </div>

                      <div className='comment-modal'>
                        <Card variant = "plain" className='allCommentsCard'>
                          <Comments postData={post} />
                        </Card>
                        <Card variant = "plain" className='userCommentsCard' style = {{marginTop: "5%"}}>
                         <div style = {{display: "flex", marginBottom: "3%"}}>
                            <ModalLike postData = {post} userData = {user} style = {{display: "flex", justifyContent: "center", alignItems: "center"}}/>
                            <Typography style = {{marginLeft: "4%"}}>
                              {post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users`}
                            </Typography>
                          </div>
                          <div style = {{display: "flex"}}>
                            <AddComments userData={user} postData = {post}/>
                          </div>
                        </Card>
                      </div>
                    </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>
      }
    </div>
  )
}
