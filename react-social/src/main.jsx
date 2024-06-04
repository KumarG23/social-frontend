import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App' // css

import App from './App.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Header from './Header.jsx';
import { Footer } from './Footer.jsx';
import Profile from './Profile.jsx';
import ErrorPage from './ErrorPage.jsx';

import { AuthContext } from './AuthContext.js';

function Layout() {
  return (
    <>
      <Header />
      <div id='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);


const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || (''));

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
)
