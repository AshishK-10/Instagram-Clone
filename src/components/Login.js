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
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './Login.css'
import instaLogo from '../assets/instagramText.jpg'
import img_1 from '../assets/pic_1.jpg'
import img_2 from '../assets/pic_2.jpg'
import img_3 from '../assets/pic_3.jpg'
import img_4 from '../assets/pic_4.jpg'
import img_5 from '../assets/pic_5.jpg'
import {Link} from 'react-router-dom'
import  {AuthContext} from '../Context/authContext';

export default function Login() {
  let stores = useContext(AuthContext);
  console.log(stores)
  return (
    <div className='loginWrapper'>
      <div className='imgcar'>
        <div className='car'>
          <CarouselProvider
            naturalSlideWidth={239}
            naturalSlideHeight={239}
            hasMasterSpinner
            visibleSlides={1}
            totalSlides={5}
            isPlaying = {true}
            infinite = {true}
            dragEnabled = {false}
          >
            <Slider>
              <Slide index={0}><Image src = {img_1}/></Slide>
              <Slide index={1}><Image src = {img_2}/></Slide>
              <Slide index={2}><Image src = {img_3}/></Slide>
              <Slide index={3}><Image src = {img_4}/></Slide>
              <Slide index={4}><Image src = {img_5}/></Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className='loginCard'>
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
            <Typography color = "primary" variant="subtitle1" style={{textAlign: "center"}}>
              Forget Password ?
            </Typography>
          </CardContent>
          <CardActions>
            <Button color ="primary" fullWidth= {true} variant = "contained">
              LOG IN
            </Button>
          </CardActions>
        </Card>
        <Card variant = "outlined" style={{height:"10vh", marginTop: "1%", justifyContent: "center"}}>
          <CardContent>
            <Typography className='footerLine' variant="subtitle1">
              Don't have an account ? <Link to = "/signup" style={{textDecoration:"none"}}>Signup</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
