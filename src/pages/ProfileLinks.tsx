
import React, { useState } from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';


const ProfileLinks: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <HeaderProfile /> 
            <ProfileSidebar />
            <div className="container contect app-container"> 
                <h1 className="link">Links</h1>
                <div className="form-group links"> 
                    <input
                        type="text" 
                        placeholder="Search"
                        className="form-control search"
                    />
                    <button type="submit" className="btn btn-primary sort">Sort</button>
                </div>

                <div className="links">
                    <h3 className="links">Link name</h3>
                    <p className="alllink">https://loremLorem ipsum dolor sit amet consectetur oremLorem
                        ipsum dolor sit amet consectetur.  .  </p>
                </div>
                <div className="links">
                    <h3 className="links">Link name</h3>
                    <p className="alllink">https://loremLorem ipsum dolor sit amet consectetur oremLorem
                        ipsum dolor sit amet consectetur.  .  </p>
                </div>
                <div className="links">
                    <h3 className="links">Link name</h3>
                    <p className="alllink">https://loremLorem ipsum dolor sit amet consectetur oremLorem
                        ipsum dolor sit amet consectetur.  .  </p>
                </div>
                <div className="links">
                    <h3 className="links">Link name</h3>
                    <p className="alllink">https://loremLorem ipsum dolor sit amet consectetur oremLorem
                        ipsum dolor sit amet consectetur.  .  </p>
                </div>
              
                <button onClick={handleOpenPopup} type="submit" className="btn btn-primary loginbtn addlink links">
                    <img src={addlink} alt="Add link" />
                    Add link</button>




            </div>
        </div>

    );
};

export default ProfileLinks;
