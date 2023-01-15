import React, {useContext} from 'react'
import { AuthContext } from '../Context/authContext'

export default function Feed() {
  const {logout} = useContext(AuthContext)
  return (
    <div>
      <p>
        hello this is the feed
      </p>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}
