import React, {useState} from 'react'
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
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='SignupWrapper'>
      <div className='SignupCard'>
        <Card variant='outlined' className='login-card'>
          <div className='insta-logo'>
            <img src = {instaLogo} className = 'instaTextPic' />
          </div>
          <CardContent>
            <Typography className='logo-subtitle' variant="subtitle1">
              SignUp to see photos and videos from your friends
            </Typography>
            {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth= {true} margin = "dense" size = "small"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth= {true} margin = "dense" size = "small"/>
            <TextField id="outlined-basic" label= "Full Name" variant="outlined" fullWidth= {true} margin = "dense" size = "small"/>
            <Button color = "secondary" fullWidth = {true} variant = "outlined" margin = "dense" startIcon = {<CloudUploadIcon/>} component = "label">
              Upload Profile Image
              <input type = "file" accept='images/*' hidden/>
            </Button>
          </CardContent>
          <CardActions>
            <Button color ="primary" fullWidth= {true} variant = "contained">SIGN UP</Button>
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
