import React, {useContext,} from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/authContext'
import instaLogo from '../assets/instagramText.jpg'
import HouseIcon from '@mui/icons-material/House';
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from '@mui/material/Avatar';
import './Navbar.css'

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({userData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = ()=>{
    navigate(`/profile/${userData.user_id}`)
  }

  const handleBannerClick = ()=>{
    navigate(`/`)
  }

  const handleBannerExplore = ()=>{
    let win = window.open('https://www.linkedin.com/in/ashish-kumar-24b482204/','_blank');
    win.focus();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><Avatar src = {userData.profileUrl} sx = {{height: "1.6rem", width: "1.6rem"}}/><p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={logout}><LogoutIcon/><p>&nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}><Avatar src = {userData.profileUrl} sx = {{height: "1.6rem", width: "1.6rem"}}/><p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={logout}><LogoutIcon/><p>&nbsp;</p>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style = {{background: "white"}}>
        <Toolbar>
          <div className='instagramLogoDiv' style = {{display: "flex", justifyContent: "start"}}>
            <img src= {instaLogo} onClick = {handleBannerClick} style = {{cursor: "pointer", width: "30%"}}/>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, color: "black", alignItems: "center", marginRight: "4rem" }}>
            <HouseIcon  onClick = {handleBannerClick} sx = {{marginRight: "1.5rem", cursor: "pointer"}}/>
            <ExploreIcon onClick = {handleBannerExplore} sx = {{marginRight: "7%", cursor: "pointer" }}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            <Avatar src = {userData.profileUrl} sx = {{height: "2rem", width: "2rem"}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color = "black"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
