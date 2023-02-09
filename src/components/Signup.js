import React, {useState, useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CardActionArea } from '@mui/material';
import './Signup.css'
import instaLogo from '../assets/instagramText.jpg'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/authContext';
import { database, storage } from '../firebase';

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const {signup} = useContext(AuthContext);

  const handleSignup = async() => {
    if(file == null){
      setError("please upload profile image to proceed!");
      setTimeout(()=>{
        setError('')
      },2000)
      return
    }
    try{
      setError('')
      setLoading(true)
      let userObj = await signup(email, password)
      let user_id = userObj.user.uid;
      const uploadTask = storage.ref(`/users/${user_id}/ProfileImage`).put(file);
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
        return
      }
      function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=> {
          database.users.doc(user_id).set({
            email: email,
            user_id: user_id,
            fullname: name,
            profileUrl: url,
            created_at: database.getTimeStamp()
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
      setLoading(false)
      return
    }
  }

  return (
    <div className='SignupWrapper'>
      <div className='SignupCard'>
        <Card variant='outlined' className='login-card'>
          <div className='insta-logo'>
            <img src = {instaLogo} className = 'instaTextPic' alt = '' />
          </div>
          <CardContent>
            <Typography className='logo-subtitle' variant="subtitle1">
              SignUp to see photos and videos from your friends
            </Typography>
            {error !== '' && <Alert severity="error">{error}</Alert>}
            <TextField type = "email" id="outlined-basic" label="Email" variant="outlined" fullWidth= {true} margin = "dense" size = "small" value = {undefined} onChange = {(e)=>setEmail(e.target.value)}/>
            <TextField type = "password" id="outlined-basic" label="Password" variant="outlined" fullWidth= {true} margin = "dense" size = "small" value = {undefined} onChange = {(e)=>setPassword(e.target.value)}/>
            <TextField id="outlined-basic" label= "Full Name" variant="outlined" fullWidth= {true} margin = "dense" size = "small" value = {undefined} onChange = {(e) =>setName(e.target.value)}/>
            <Button color = "secondary" fullWidth = {true} variant = "outlined" margin = "dense" startIcon = {<CloudUploadIcon/>} component = "label">
              Upload Profile Image
              <input type = "file" accept='images/*' hidden onChange={(e)=>{setFile(e.target.files[0])}}/>
            </Button>
          </CardContent>
          <CardActions>
            <Button color ="primary" fullWidth= {true} variant = "contained" disabled = {loading} onClick = {handleSignup}>
              SIGN UP
            </Button>
          </CardActions>
          <CardContent>
            <Typography className='footerLine' variant="subtitle1" style={{height:"6vh"}}>
              By signing up, you agree to our Terms, Data Policy and Cookies Policy.
            </Typography>
          </CardContent>
        </Card>
        <Card variant = "outlined" style={{height:"10vh", marginTop: "1%", justifyContent: "center"}}>
          <CardContent>
            <Typography className='footerLine' variant="subtitle1">
              Having an account ? <Link to = "/login" style={{textDecoration:"none"}}>Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
