import React from 'react'
import './Error.css';


function Error(props) {
  return (
    <div className='login-error-wrap'>
        {props.message}
    </div>
  )
}

export default Error
