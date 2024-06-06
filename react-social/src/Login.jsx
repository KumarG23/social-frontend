import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { getToken } from "./api";
import Header from "./Header";
import SignUp from "./SignUp";

function Login() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const token = await getToken({ username, password });
      localStorage.setItem('accessToken', token);
      navigate('/profile');
    } catch (error) {
      setErrorMessage('Invalid username or password');
      console.error('Login failed: ', error);
    }
  };

  return (
    <div id='login' className="p-5">
      <h1>Login</h1>
      <div>
        <div>Username:</div>
        <input 
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <div>Password:</div>
        <input type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: 10 }}>
          {errorMessage}
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        <button id="btn" onClick={submit}>Login</button>
      </div>
      <Link id="sign" to='/signup'>Sign Up</Link>
    </div>
  );
}

export default Login;
