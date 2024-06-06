import { useState } from 'react'
import './App.css';
import { useContext } from 'react';
import { fetchUser } from './api';
import { AuthContext } from './AuthContext';
import { getPosts } from './api';

function App() {

  return (
    <>
      <div>
        <h1 id='homepage'>Home Page</h1>
      </div>
    </>
  )
}

export default App
