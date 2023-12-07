import React, { useState } from 'react'
import '../css/login.css';

const Login = () => { 
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  function handleSubmit(event){
    event.preventDefault();
    console.log(email,password)
    setEmail('')
    setPassword('')
  }
  return (
    <div className='bg'>
  <form onSubmit={handleSubmit}>
    <h1> <b>Login</b></h1>
    <div className='login'>
    <input type='text' placeholder='Username' id='username'
    // value=""/>
        onChange={e =>setEmail(e.target.value)}/>
    </div>
    <div className='login'>
    <input type='password' placeholder='password'
    // value=''/>
    onChange={e =>setPassword(e.target.value)}/>
    </div>
    <div className='forger-ps'>
    </div>
    <div className='button'>
    <button type='submit'className='btn'>Login</button>
    </div>
    <div className="register">
                <p><u> Don't have account?</u><a href="#">Register</a></p>
            </div>    

  </form>
  </div>
  )
}

export default Login



