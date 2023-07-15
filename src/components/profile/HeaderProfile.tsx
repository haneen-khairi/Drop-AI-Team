import React from 'react';
 
import { Link } from 'react-router-dom';
import CustomNavbarProfile from './CustomNavbarProfile';
 

const HeaderProfile: React.FC = () => {
    // const [activeKey, setActiveKey] = React.useState("1");

    return (
        <header className="home-header">
             
                <div className='bg-effect' >
                    <div className='blob-one'></div>
                    <div className='blob-two'></div>
                    <div className='blob-three'></div>
                </div>
          
             <Link className='profile btn btn-primary' to={`/`}>Search by social media</Link>
         
            {/* <CustomNavbar appearance="subtle" activeKey={activeKey} onSelectNav={setActiveKey} /> */}
            <CustomNavbarProfile appearance="subtle" />
        </header>
    );
};

export default HeaderProfile;
