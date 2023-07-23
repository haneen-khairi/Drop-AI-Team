import React from 'react';
import usericon from '../../assets/img/profile/ucericon.svg';
import { Link } from 'react-router-dom';

const CustomNavbarProfile: React.FC<any> = ({ userDataHeader }) => {
  const imageSrc = userDataHeader && userDataHeader.image ? userDataHeader.image : usericon;

  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <Link className="nav-item" to={`/`}>
          Home
        </Link>
        <Link className="nav-item" to={`/wishlist`}>
          Wishlist
        </Link>
        <Link className="nav-item" to={`/login`}>
          <img src={imageSrc} className="iconsidebar" alt="user icon" />
          {userDataHeader && userDataHeader.first_name}
        </Link>
      </ul>
    </nav>
  );
};

export default CustomNavbarProfile;
