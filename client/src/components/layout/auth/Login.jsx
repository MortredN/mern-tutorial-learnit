import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useLocation } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import AlertMessage from '../AlertMessage'

const Login = () => {
  const {loginUser} = useContext(AuthContext)

  const [loginForm, setLoginForm] = useState({
    username: '', password: ''
  })

  const {username, password} = loginForm

  const [alert, setAlert] = useState(null)

  let location = useLocation()


  const onChangeLoginForm = event => setLoginForm({...loginForm,
    [event.target.name]: event.target.value
  })

  const login = async event => {
    event.preventDefault()

    try {
      const loginData = await loginUser(loginForm)
      if (!loginData.success) {
        setAlert({type: 'danger', message: loginData.message})
      }
    }
    catch (error) {
      setAlert({type: 'danger', message: error.message})
    }
  }

  const checkNavigatedFromRegister = () => {
    if(location.state && location.state.registerSuccess) {
      setAlert({type: 'success', message: location.state.registerMessage})
      setTimeout(() => {
        setAlert(null)
        location.state = null
      }, 5000)
    }
  }
  

  useEffect(() => checkNavigatedFromRegister(), [])

  
  return (
    <>
      <Form className='mt-3' onSubmit={login}>
        <AlertMessage info={alert}/>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChangeLoginForm}
            required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeLoginForm}
            required />
        </Form.Group>
        <Button variant='success' type='submit' className='mb-3'>Login</Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' className='ms-2'>Register</Button>
        </Link>
      </p>
    </>
  )
}

export default Login
