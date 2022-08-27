import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";


export default props => {
  const navigate = useNavigate();
  return (
    <Menu>
      <a className="menu-item" href="/Home">
        Home
      </a>
      <a className="menu-item" href="/Profile">
        Profile
      </a>
      <a className="menu-item" href="/Summary">
        Summary
      </a>
      <a className="menu-item" onClick={()=>{
              localStorage.removeItem("userInfo");
              navigate('/');
            }}>
        Logout
      </a>
    </Menu>
  );
};
