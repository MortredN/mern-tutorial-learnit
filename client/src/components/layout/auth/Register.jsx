import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import AlertMessage from '../AlertMessage'

const Register = () => {
  const {registerUser} = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    username: '', password: '', confirmPassword: ''
  })

  const {username, password, confirmPassword} = registerForm

  const [alert, setAlert] = useState(null)

  const navigate = useNavigate()


  const onChangeRegisterForm = event => setRegisterForm({...registerForm,
    [event.target.name]: event.target.value
  })

  const register = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setAlert({type: 'danger', message: 'Confirm Password does not match Password'})
    }
    else {
      try {
        const registerData = await registerUser(registerForm)
        if (!registerData.success) {
          setAlert({type: 'danger', message: registerData.message})
        }
        else {
          navigate('/login', {replace: false, state:
            {registerSuccess: true, registerMessage: registerData.message}
          })
        }
      }
      catch (error) {
        setAlert({type: 'danger', message: error.message})
      }
    }
  }

  return (
    <>
      <Form className='mt-3' onSubmit={register}>
        <AlertMessage info={alert}/>

        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChangeRegisterForm}
            required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeRegisterForm}
            required />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required />
        </Form.Group>
        <Button variant='success' type='submit' className='mb-3'>Register</Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ms-2'>Login</Button>
        </Link>
      </p>
    </>
  )
}

export default Register
