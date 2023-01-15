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
import {Link, useNavigate} from 'react-router-dom'
import  {AuthContext} from '../Context/authContext';
import { ErrorOutline } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleLogin = async () =>{
    try{
      setError('');
      setLoading(true);
      let res = await login(email, password)
      setLoading(false);
      navigate('/')
    }catch(e){
      setError(e.message);
      setTimeout(()=>{
        setError(''); //remove errors after 2 secs.
      },3000)
      setLoading(false);
    }
  }

  const handleForgetPassword = ()=>{
    console.log("clicked")
  }

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
            {error != '' && <Alert severity="error">{error}</Alert>}
            <TextField type = "email" id="outlined-basic email" label="Email" variant="outlined" fullWidth= {true} margin = "dense" size = "small"
              value = {email} onChange = {(e)=>{setEmail(e.target.value)}}/>
            <TextField type = "password" id="outlined-basic password" label="Password" variant="outlined" fullWidth= {true} margin = "dense" size = "small" 
              value = {password} onChange = {(e)=>{setPassword(e.target.value)}}/>
            <Typography color = "primary" variant="subtitle1" style={{textAlign: "center", cursor :"pointer"}}>
              <Link to = "/forgetPassword" style={{textDecoration:"none"}}>Forget Password ?</Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button color ="primary" fullWidth= {true} variant = "contained" onClick={handleLogin} disabled = {loading}>
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
