import React, {useState, useEffect} from 'react';
import './Register.css';
import SignButton from './SignButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            navigate('/Home');
        }
    }, [navigate])

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRegisterSubmit = async (event)=>{
    event.preventDefault();
    try {
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        setLoading(true)
        const {data} = await axios.post('/api/users/',{
            name, email, mobile, password
        }, config)
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false)
    } catch (error) {
        setError(error.response.data.message);
    }
    window.location.reload();
  }
  const windowWidth = window.innerWidth;
  const getStyledTextField = ()=>{
    const styleTextField1={maxWidth: '45vh', maxHeight:'10vh', minWidth:'45vh', minHeight:'10vh', marginLeft:'4vh'};
    const styleTextField2={maxWidth: '260px', maxHeight:'23px', minWidth:'260px', minHeight:'23px', margin: '25px'};
    if(windowWidth>880){
        return(styleTextField1)
    }
    else return (styleTextField2)
  }

  const getStyledButton = () => {
    const styleButton1 = {maxWidth: '15vh', maxHeight:'6vh', minWidth:'15vh', minHeight:'6vh', marginLeft:'4vh', fontWeight:'bold'}
    const styleButton2 = {maxWidth: '80px', maxHeight:'35px', minWidth:'80px', minHeight:'35px', fontWeight:'bold', fontSize:'12px', marginTop:'30px'}
    if(windowWidth>880){
        return(styleButton1)
    }
    else return (styleButton2)
  }


  return (
    <div className='main-container'>
        <div className='left-panel'></div>
        <div className='right-panel'>
          <div className = 'mainCall'>
              Want to analyse your expenses?
          </div>
          <div className='subcall1'>
              Register
          </div>
          <TextField id="outlined-basic" type='name' name="name" value={name} label="Name" style={getStyledTextField()} variant="outlined" onChange={(event)=>setName(event.target.value)}/>
          <TextField id="outlined-basic" type='email' name="email" value={email} label="Email" style={getStyledTextField()} variant="outlined" onChange={(event)=>setEmail(event.target.value)} />
          <TextField id="outlined-basic" type='mobile' name="mobile" value={mobile} label="Mobile" style={getStyledTextField()} variant="outlined" onChange={(event)=>setMobile(event.target.value)} />
          <TextField id="outlined-basic" type='password' name="password" value={password} label="Password" style={getStyledTextField()} variant="outlined" onChange={(event)=>setPassword(event.target.value)}/>
          <Button style={getStyledButton()}variant="contained" onClick={handleRegisterSubmit} >Register</Button>
          <div className='account-sign-in'>
              Already have an account?
          </div>
          <SignButton message ='Sign in' withIcon = {0} signin = {1}/> 
        </div>
    </div>
  )
}

export default Register
