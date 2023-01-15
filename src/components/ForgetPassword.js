import React, {useState, useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import './Signup.css'
import instaLogo from '../assets/instagramText.jpg'
import {Link} from 'react-router-dom'
import { AuthContext } from '../Context/authContext';

export default function ForgetPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {forgetPassword} = useContext(AuthContext);

  const handleForgetPassword = async()=>{
    try{
     setError('')
     setLoading(true)
     let store = await forgetPassword(email)
     setLoading(false)
    }catch(err){
      setError(err.message)
      setLoading(false)
      setError(err.message)
      setTimeout(()=>{
        setError('')
      },2000)
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
              Enter your registered email address.
            </Typography>
            {error !== '' && <Alert severity="error">{error}</Alert>}
            <TextField type = "email" id="outlined-basic" label="Email" variant="outlined" fullWidth= {true} margin = "dense" size = "small" value = {undefined} onChange = {(e)=>setEmail(e.target.value)}/>
          </CardContent>
          <CardActions>
            <Button color ="primary" fullWidth= {true} variant = "contained" disabled = {loading} onClick = {handleForgetPassword}>
              Send Reset Link
            </Button>
          </CardActions>
          <CardContent>
            <Typography className='footerLine' variant="subtitle1" style={{height:"6vh"}}>
              &#169; <b>Instagram </b> {new Date().getFullYear()}
            </Typography>
          </CardContent>
        </Card>
        <Card variant = "outlined" style={{height:"10vh", marginTop: "1%", justifyContent: "center"}}>
          <CardContent>
            <Typography className='footerLine' variant="subtitle1">
              Create an account ? <Link to = "/signup" style={{textDecoration:"none"}}>SignUp</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
