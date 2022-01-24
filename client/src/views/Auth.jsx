import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import Login from "../components/layout/auth/Login"
import Register from "../components/layout/auth/Register"
import { AuthContext } from '../contexts/AuthContext' 

const Auth = ({ authRoute }) => {
  const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
  

  let body = null

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation='border' variant='info' />
      </div>
    )
  }
  else if (isAuthenticated) {
    body = (
      <Navigate to='/dashboard' replace={true} />
    )
  }
  else {
    body = (
      <>
        {authRoute === 'login' && <Login />}
        {authRoute === 'register' && <Register />}
      </>
    )
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
