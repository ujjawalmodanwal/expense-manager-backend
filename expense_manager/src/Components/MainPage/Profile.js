import React, {useState} from 'react';
import './Profile.css';
import Header from './Header';
import Sidebar from './Sidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import userProfileIcon from '../../Resources/Images/userProfileIcon.png'
import axios from 'axios';

function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const windowWidth = window.innerWidth;

  const [name, setName] = useState(userInfo.name);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [email, setEmail] = useState(userInfo.email)

  const [updated, setUpdated] = useState(false)

  const getStatus = ()=>{
    return(
        <div className='user-update-status'>Data Updated! Kindly login again to see the changes</div>
    )
  }



  const updateUserInfo = async (event) =>{
    event.preventDefault();
		const updatedUserInfo = {
			name: name,
			mobile: mobile,
			email: email,
		}
		try {
			const config={
				headers:{
					"Authorization": `Bearer ${userInfo.token}`
				}
			}
			await axios.put(`/api/users/update/${userInfo._id}`,{
				updatedUserInfo
			}, config)
		} catch (error) {
			console.log(error)
		}
        setUpdated(true)
  }
  const getTextFieldStyle  = () =>{  
    if(windowWidth>880){
        return ({height:'1vw', width:'20vw', margin:'0 0 5vw 0' })
    }
    else return ({minHeight:'23px', minWidth:'218px',maxHeight:'23px', maxWidth:'218px', margin:'0 0 60px 0' })
    }

    const getButtonStyle = () =>{
		if(windowWidth>880){
			return ({height:'2.5vw', width:'6vw', margin:'-5px 0 15px 0'})
		}
		else{
			return ({ maxHeight:'40px', minHeight:'40px', minWidth:'100px', maxWidth:'100px' })
		}
	}
  return (
    <div>
        <Header/>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className='profile-page-container'>
            <div className='profile-information-box'>
            <div className='profile-image-container'>
                <img alt="user image"className = "profile-image" src = {userProfileIcon}/>
            </div>
            <TextField id="outlined-basic" type='text' label="Name" name = "userName" defaultValue ={userInfo.name} style={getTextFieldStyle()} variant="outlined" onChange={(event)=>{setUpdated(false); setName(event.target.value)}}/> 
            <TextField id="outlined-basic" type='email' label="Email" name = "userEmail" defaultValue ={userInfo.email} style={getTextFieldStyle()} variant="outlined" onChange={(event)=>{setUpdated(false);setEmail(event.target.value)}}/> 
            <TextField id="outlined-basic" type='mobile' label="Contact" name = "userName" defaultValue ={userInfo.mobile} style={getTextFieldStyle()} variant="outlined" onChange={(event)=>{setUpdated(false);setMobile(event.target.value)}}/>
            {updated && getStatus()} 
            <Button variant="contained" onClick={(event)=>updateUserInfo(event)}style={getButtonStyle()}>Update</Button>
            </div>
        </div>
    </div>
  )
}

export default Profile
