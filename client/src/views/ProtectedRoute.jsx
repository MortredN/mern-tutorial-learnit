import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { AuthContext } from '../contexts/AuthContext'
import NavbarMenu from '../components/layout/dashboard/NavbarMenu'
import Dashboard from '../components/layout/dashboard/Dashboard'
import About from '../components/layout/dashboard/About'

const ProtectedRoute = ({authRoute, ...rest}) => {
  const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation='border' variant='info' />
      </div>
    )
  }
  else if (!isAuthenticated) {
    return (
      <Navigate to='/login' replace={true} />
    )
  }
  else {
    return (
      <>
        <NavbarMenu />
        {authRoute === 'dashboard' && <Dashboard {...rest} />}
        {authRoute === 'about' && <About {...rest} />}
      </>
    )
  }
}

export default ProtectedRoute
