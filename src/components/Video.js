import React, {useState} from 'react'
import './Video.css'
import  ReactDOM  from 'react-dom';
export default function Video(props) {
  const handleClick = (e)=>{
    e.preventDefault();
    e.target.muted = !e.target.muted
  }

  const handleScroll = (e)=>{
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    if (next)
    {
      next.scrollIntoView()
      e.target.muted = true
    }
  }
  return (
    <video src = {props.src} className = "video-styling" muted = "muted" onClick={handleClick} onEnded = {handleScroll} controls controlsList='noplaybackrate nodownload nofullscreen'  disablePictureInPicture  onMouseOver={event => event.target.play()}
    onMouseOut={event => event.target.pause()}/>
  )
}
