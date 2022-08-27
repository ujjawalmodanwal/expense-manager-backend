import React,{useState, useEffect} from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SignButton from './SignButton';
import Google from '../../Resources/Images/google_logo.png';
import Error from './Error';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            navigate('/Home');
        }
    }, [navigate])

    const handleLoginSubmit  = async (event) =>{
        event.preventDefault();
        try {
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }
            
            const {data} = await axios.post('/api/users/login',{
                email, password
            }, config)
            localStorage.setItem("userInfo", JSON.stringify(data));
            
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
    const styleButton2 = {maxWidth: '70px', maxHeight:'30px', minWidth:'70px', minHeight:'30px', fontWeight:'bold', fontSize:'12px'}
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
                Login
            </div>
            <TextField id="outlined-basic" type='email' name="email" label="Email" style={getStyledTextField()} value ={email} variant="outlined" onChange={(event)=>setEmail(event.target.value)}/>
            <TextField id="outlined-basic" type='password'name="password" label="Password" style={getStyledTextField()} value={password} variant="outlined" onChange={(event)=>setPassword(event.target.value)}/>
            {error && <Error message = {error}/>}
            <div className='action-buttons'>
            <Button onClick={handleLoginSubmit}style={getStyledButton()}variant="contained" >Login</Button>
            <div className='forgot-password'>
                Forgot Password?
            <Button style={{maxWidth: '50px', maxHeight:'25px', minWidth:'50px', minHeight:'25px', margin:'7px 0 0 25px', fontWeight:'bold', fontSize:'10px'}}variant="contained" >Click</Button>
            </div>
                
            </div>
            <div className='account-register'>
                New User?
            </div>
            <SignButton message ='Register' withIcon = {0} signin = {0}/> 
            <SignButton message = 'Sign up with Google' withIcon = {1} signin={0} icon={Google}/>
        </div>
    </div>
  )
}

export default Login