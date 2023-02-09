import React, {useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import { database, storage } from '../firebase';
import {Link, useNavigate} from 'react-router-dom'


export default function UploadFile(props) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const navigate = useNavigate();

  const setNewFile = (event)=>{
    setFile(event.target.files[0])
    uploadFile(props, event.target.files[0])
  }

  const uploadFile = async(props,file)=>{
    if(file === null)
    {
      setError('please select a file to upload')
      setTimeout(()=>{
        setError('')
      }, 3000)
      return;
    }
    if(file.size / (1024 * 1024) > 100)
    {
      setError('file size limit exceeded!')
      setTimeout(()=>{
        setError('')
      }, 3000)
      return;
    }
    try{
      setError('')
      setLoading(true)
      let post_id = uuidv4();
      const uploadTask = storage.ref(`/posts/${post_id}/${file.name}`).put(file);
      uploadTask.on('state_changed', fn1, fn2, fn3)
      function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
      }
      function fn2(error){
        setError(error);
        setTimeout(()=>{
          setError('')
        },2000)
        setLoading(false)
        return;
      }
      function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=> {
          let obj = {
            likes: [],
            comments: [],
            pID: post_id,
            pUrl: url,
            uName: props.user.fullname,
            uProfile: props.user.profileUrl,
            userId: props.user.user_id,
            created_at: database.getTimeStamp()
          }
          database.posts.add(obj).then(async (ref)=>{
            let res = await database.users.doc(props.user.user_id).update({
              postIds : props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
            })
          }).then(()=>{
            setLoading(false)
          }).catch(error => {
            setError(error.message)
            setTimeout(()=>{
              setError('');
            },3000)
            setLoading(false)
          })
        })
        setLoading(false);
        navigate('/')
      }
    }catch(err){
      setError(err.message)
      setTimeout(()=>{
        setError('')
      },2000)
      return;
    }
  }

  return (
    <div style = {{marginTop: "5rem", marginBottom: "1rem"}}>
      {error !== '' && <Alert severity="error">{error}</Alert>}
      <>
       <input type = "file" accept='video/*' id = "upload-input" style = {{display: "none"}} onChange = {(e)=> {setNewFile(e)}}/>
       <label htmlFor='upload-input'>
        <Button variant = "outlined"
            color =  "secondary"
            component = "span"
            disabled = {loading}>
            <MovieIcon/> &nbsp; Upload Video
          </Button>
        </label>
        {loading && <LinearProgress color = "secondary" />}
      </>
    </div>
  )
}
