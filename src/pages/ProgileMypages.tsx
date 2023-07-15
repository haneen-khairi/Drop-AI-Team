
import React, { useState } from 'react';
import Popup from './../components/profile/Popup';

import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';
const ProgileMypages: React.FC = () => {
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
                <button onClick={handleOpenPopup} type="submit" className="btn btn-primary loginbtn addlink">
                    <img src={addlink} alt="Add link" />
                    Add link</button>

                <Popup isOpen={isOpen} onClose={handleClosePopup}>
                <form className="page">
                   
                    <div className="form-group">
                        <label htmlFor="mobile_number">Add name</label>
                        <input
                            type="text"
                            id="mobile_number"
                            placeholder="Add name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Add link</label>
                        <textarea
                          
                            id="mobile_number"
                            placeholder="Add link"
                            className="form-control"
                        />
                    </div>
                   

                    <button type="submit" className="btn btn-primary add">Add</button>
                    {/* <button type="submit" className="btn btn-primary Cancel">Cancel</button> */}



                </form>
                </Popup>


            </div>
        </div>

    );
};

export default ProgileMypages;
