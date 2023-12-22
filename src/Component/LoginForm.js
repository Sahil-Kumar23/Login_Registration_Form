import React,{useState} from 'react';
import './LoginForm.css';

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [msg , setMsg] = useState('');
  const [emailError , setEmailError] = useState('');
  const [passError , setPassError] = useState('');

  const handleForEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailError('');
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    setEmailValid(isValid);
  };

  const handleForPassword = (e) => {
    setPassword(e.target.value);
    setPassError('');
  };

  const handleForSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() && !password.trim()){
      setEmailError('Email field is empty!!');
      setPassError('Password field is empty!!');
      return;
    }
    if (!email.trim()) return setEmailError('Email field is empty!!');
    if (!password.trim()) return setPassError('Password field is empty!!');
    if (!emailValid) return setEmailError('Invalid email!!');

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setMsg("Login successful..");      
        setEmail('');
        setPassword('')
        setTimeout(() =>{
          setMsg('')
        },5000)
      } else {
        setMsg("Login failed!!"); 
        setTimeout(() =>{
          setMsg('')
        },5000)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form>
          <label htmlFor="email"> Email* </label>
          <input type="email" id="email" name="email" value={email} onChange={handleForEmail} placeholder="Enter your email" required/>
          {emailError && <p className="msg">{emailError}</p>}
          <label htmlFor="password"> Password* </label>
          <input type="password" id="password" name="password" value={password} onChange={handleForPassword} placeholder="Enter your password" required/>
          {passError && <p className="msg">{passError}</p>}
          <button type="submit" onClick={handleForSubmit}>Login</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <div className="container-signin">
          <p>New user? <a href="/register">Register</a>.</p>
          {/* <button onClick={()=> navigate("/register")}>Register</button> */}
      </div>
    </div>
  )
}
