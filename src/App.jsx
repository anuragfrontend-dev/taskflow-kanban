import { Board } from './components/Board/Board'
import { useState, useEffect } from 'react'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [isDark,setIsDark]=useState(()=>{
      return localStorage.getItem('theme')==='dark';
  });

  useEffect(()=>{
    localStorage.setItem('theme',isDark? 'dark':'light');
  },[isDark])

  return (
  <Routes>
    <Route path='/' element={<Board 
      isDark={isDark} 
      setIsDark={setIsDark}
    />} />
    <Route path='/Signup' element={<SignUpPage 
      isDark={isDark}
    />} />
    <Route path='/Login' element={<LoginPage 
      isDark={isDark}
    />} />
    <Route path='/Profile' element={<ProfilePage 
      isDark={isDark}
    />} />
  </Routes>
)
}

export default App
