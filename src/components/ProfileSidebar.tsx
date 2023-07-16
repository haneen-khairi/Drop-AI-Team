import React from 'react';
 
import settings from '../assets/img/profile/user-Regular.svg';
import password from '../assets/img/profile/lock-Regular.svg';
import pages from '../assets/img/profile/mypage.svg';
import logout from '../assets/img/profile/logout.svg';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  function onLogout(){
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
     
    
    <div className="kt_app_sidebar ">
   
    <div className="sidebar ">
      <ul className="nav flex-column">
        <li className="nav-item active">
          
          <Link to="/profile" className="nav-link">
          <img src={settings} className="iconsidebar"   alt="settings" />
          Profile settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profilePassword" className="nav-link">
          <img src={password} className="iconsidebar"   alt="password" />
          Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profileLinks" className="nav-link">
          <img src={pages} className="iconsidebar"   alt="pages" />
          My pages
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={onLogout}  className="nav-link Logout">
          <img src={logout} className="iconsidebar"   alt="logout" />
          Log out
          </button>
        </li>
      </ul>
   
    </div>
  
    </div>

  );
};

export default Sidebar;
