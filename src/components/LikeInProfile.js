import React, {useState, useEffect} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

export default function LikeInProfile({userData, postData}) {
  const [like, setLike] = useState(null)

  useEffect(()=>{
    let check = postData.likes.includes(userData.user_id) ? true : false
    setLike(check)
  },[postData])

  const handleLike = ()=>{
    if(like === true)
    {
      let likes_arr = postData.likes.filter((el)=>el !== userData.user_id)
      database.posts.doc(postData.postId).update({
        likes: likes_arr,
      })
    }else{
      let likes_arr = [...postData.likes, userData.user_id]
      database.posts.doc(postData.postId).update({
        likes: likes_arr,
      })
    }
  }
    return (
      <div>
        {
          like !== null ?
          <>
          {
            like === true ?  <FavoriteIcon className={`like likeInProfile`} onClick = {handleLike}/> : <FavoriteIcon  className={`unlike-modal likeInProfile`} onClick = {handleLike}/>
          }
          </>
          :
          <></>
        }
      </div>
    )
}
