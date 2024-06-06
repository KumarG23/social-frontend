import { useState } from 'react'
import './App.css';
import { useContext } from 'react';
import { fetchUser } from './api';
import { AuthContext } from './AuthContext';
import { getPosts } from './api';

function App() {

  return (
    <div className='homepage'>
      <h1 className='welcome'>Welcome to Social</h1>
    </div>
  )
}

export default App
