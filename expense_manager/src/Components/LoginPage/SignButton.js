import React from 'react';
import './SignButton.css';
import { useNavigate } from "react-router-dom";



function SignButton(props) {
    const navigate = useNavigate();
    return (
        props.withIcon ?
            <div className='SignButton' onClick={()=>navigate('/Register')}>
                <img src = {props.icon} alt="icon"/>
                {props.message}
            </div>
            :
        props.signin!==1?
            <div className='SignButton-Email' onClick={()=>navigate('/Register')}>
                {props.message}
            </div>
            :
            <div className='Signin-already' onClick={()=>navigate('/Login')}>
                {props.message}
            </div>

            

    )
}

export default SignButton