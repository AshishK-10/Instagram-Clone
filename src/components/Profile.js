import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import './Profile.css'
import Video from './Video';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import ModalLike from './LikeInComments'
import AddComments from './AddComments'
import Comments from './Comments'
import LikeInProfile from './LikeInProfile';

export default function Profile() {
  const {id} = useParams()
  const [userData, setUserData] = useState(null)
  const [postData, setPostData] = useState(null)

  useEffect(()=>{
    database.users.doc(id).onSnapshot((snap)=>{
      let res = snap.data();
      setUserData(res)
    })
  },[id])

  useEffect(()=>{
    if(userData !== null)
    {
      let arr = [];
      (async () =>{
        let posts_arr = [];
        for (let i = 0; i < userData.postIds.length; i++){
          let data = await database.posts.doc(userData.postIds[i]).get()
          posts_arr.push({...data.data(), postId: data.id})
        }
        setPostData(posts_arr)
      })();
    }
  },[userData, postData])

  const [open, setOpen] = useState('')
  const [autoPlay, setAutoplay] = useState(false)

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen('');
  };


  return (
    <>
    {
      postData === null || userData === null ?
      <CircularProgress color="success"/>
      :
      <>
        <Navbar userData={userData}/>
        <div className = "spacer"> </div>
        <div className = "container">
          <div className = "upper-part">
            <div className = "profile-img">
              <img src = {userData.profileUrl}/>
            </div>
            <div className='info'>
              <Typography variant = "h5">
                Email: {userData.email}
              </Typography>
              <Typography variant = "h6">
                  Posts: {userData.postIds.length}
              </Typography>
            </div>
          </div>
          <hr style = {{marginTop: "2rem", marginBottom: "2rem"}}/>
          <div className='profile-videos'>
            {
              postData.map((post, index)=>{
                return(
                  <React.Fragment key = {index}>
                    <div className='videos'>
                      <Video src = {post.pUrl}/>
                      <LikeInProfile postData = {post} userData = {userData}/>
                      <ChatBubbleIcon style = {{color: "darkgrey"}} className='profile-chat-styling' onClick={()=>handleClickOpen(post.pID)}/>
                      <Dialog
                        open={open == post.pID}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        hideBackdrop = {true}
                        fullWidth = {true}
                        maxWidth = 'md'
                      >

                      <div className='modal-container'>
                        <div className='video-modal'>
                          <video autoPlay = {true} muted = "muted" controls>
                            <source src = {post.pUrl}/>
                          </video>
                        </div>

                        <div className='comment-modal'>
                          <Card variant = "plain" className='allCommentsCard'>
                            <Comments postData={post} />
                          </Card>
                          <Card variant = "plain" className='userCommentsCard' style = {{marginTop: "5%"}}>
                          <div style = {{display: "flex", marginBottom: "3%"}}>
                              <ModalLike postData = {post} userData = {userData} style = {{display: "flex", justifyContent: "center", alignItems: "center"}}/>
                              <Typography style = {{marginLeft: "4%"}}>
                                {post.likes.length === 0 ? '' : `Liked by ${post.likes.length} users`}
                              </Typography>
                            </div>
                            <div style = {{display: "flex"}}>
                              <AddComments userData={userData} postData = {post}/>
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
        </div>
      </>
    }
    </>
  )
}
