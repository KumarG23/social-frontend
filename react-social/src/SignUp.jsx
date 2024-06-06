import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './api';


const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate();
  
    const submit = () => {
      createUser({ username, password, firstName, lastName })
      navigate('/login');
    }
  
    return (
      <div id='login' className="p-5">
        <h1>Create User</h1>
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
        <div>
          <div>First Name:</div>
          <input
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <div>Last Name:</div>
          <input
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
  
        <div style={{ marginTop: 20 }}>
          <button onClick={() => submit()}>Sign Up</button>
        </div>
  
      </div>
    )
  }

  export default SignUp;