import React, {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

export default function PrivateRoute({component: Component, ...rest}) {
  const {user} = useContext(AuthContext)
  return (
      user ? <Outlet/> : <Navigate to = "login"/>
  )
}
