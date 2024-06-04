import { useState } from 'react'
import './App.css';
import { useContext } from 'react';
import { fetchUser } from './api';
import { AuthContext } from './AuthContext';

function App() {
  const { auth } = useContext(AuthContext)

  const showPosts = () => {
    getPosts()
  }

  return (
    <>
      <div>
        <h1 id='homepage'></h1>
      </div>
    </>
  )
}

export default App
