import React ,{useState} from 'react';
import { useNavigate } from 'react-router';
import './RegisterForm.css';

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError , setEmailError] = useState('');
    const [passError , setPassError] = useState('');
    const [regFailed , setRegFailed] = useState('')
    const [userNameError , setUserNameError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email,
            password,
            username
        };
        if( username.trim() === '' && password.trim() === '' && email.trim() === '' ){
            setUserNameError('Name field is empty!');
            setPassError('Password field is empty!');
            setEmailError('Email field is empty!');
            return;
        }
        if( username.trim() === '' && password.trim() === ''){
            setUserNameError('Name field is empty!');
            setPassError('Password field is empty!');
            return;
        }
        if( username.trim() === '' && email.trim() === '' ){
            setUserNameError('Name field is empty!');
            setEmailError('Email field is empty!');
            return;
        }
        if( password.trim() === '' && email.trim() === '' ){
            setPassError('Password field is empty!');
            setEmailError('Email field is empty!');
            return;
        }
        if(username.trim() === '') return setUserNameError('Name field is empty!');
        if(password.trim() === '') return setPassError('Password field is empty!');
        if(email.trim() === '') return setEmailError('Email field is empty!');
        if(password.trim() !== '' && password.length < 8) return setPassError('Password must be at least 8 characters');

        if(!validateEmail(email)) return setEmailError('Invalid email address!!');

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok) {
                console.log('Registration successful');
                setUsername('');
                setEmail('');
                setPassword('');
                navigate("/login");

            } else {
                console.log('Registration failed');
                setRegFailed('Registration failed!!');
                setTimeout(() =>{
                    setRegFailed('')
                },5000)
            }
        }).catch((error) => {
                console.error('Error:', error);
        });
    };

    const validateEmail = (email) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };

    return (
        <div className="form-container">
            <h2>Registration</h2>
            <form>
                <label htmlFor="username"> Name* </label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => {setUsername(e.target.value); setUserNameError('');}} placeholder="Enter your name" required/>
                {userNameError && <p className="msg">{userNameError}</p>}
                
                <label htmlFor="email"> Email* </label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value); setEmailError('');}} placeholder="Enter your email" required/>
                {emailError && <p className="msg">{emailError}</p>}

                <label htmlFor="password"> Password* </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value); setPassError('')}} placeholder="Enter your password" required/>
                {passError && <p className="msg">{passError}</p>}
                
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
            {regFailed && <p className="msg">{regFailed}</p>}
            <div className="container-signin">
                <p>Already registered? <a href="/">Login</a>.</p>
            </div>
        </div>
    )
}
