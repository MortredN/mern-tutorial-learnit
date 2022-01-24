import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './components/layout/Landing'
import ProtectedRoute from './views/ProtectedRoute'
import Auth from './views/Auth'

import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'

const App = () => {
  return (
    <AuthContextProvider>
    <PostContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path='login' element={<Auth authRoute={'login'}/>} />
          <Route path='register' element={<Auth authRoute={'register'}/>} />

          <Route path='dashboard' element={<ProtectedRoute authRoute={'dashboard'}/>} />
          <Route path='about' element={<ProtectedRoute authRoute={'about'}/>} />
        </Routes>
      </BrowserRouter>
    </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App
