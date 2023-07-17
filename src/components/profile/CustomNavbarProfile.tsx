import React from 'react';
import usericon from '../../assets/img/profile/ucericon.svg';
import { Navbar } from 'rsuite';
import { Link } from 'react-router-dom';

// interface CustomNavbarProps extends React.ComponentProps<typeof Navbar> {
//     onSelectNav: (eventKey: string) => void;
//     activeKey: string;
// }

const CustomNavbarProfile: React.FC<any> = ({userDataHeader}) => {
    return (
        // <Navbar {...props}>
        //     <Nav onSelect={onSelectNav} activeKey={activeKey}>
        //         <Nav.Item eventKey="1" icon={<HomeIcon />}>
        //             Home
        //         </Nav.Item>
        //         <Nav.Item eventKey="2">Wishlist</Nav.Item>
        //         <Nav.Item eventKey="3">Social Search</Nav.Item>
        //     </Nav>
        // </Navbar>
        <nav className='nav-bar'>
            <ul className='nav-list'>
                <Link className='nav-item' to={`/`}>Home</Link>
                <Link className='nav-item' to={`/wishlist`}>Wishlist</Link>
                <Link className='nav-item' to={`/login`}>
                <img src={userDataHeader.image === null ? usericon : userDataHeader.image} className="iconsidebar"   alt="logout" />
                    {userDataHeader.first_name}</Link>
               
              
            </ul>
        </nav>
    );
};

export default CustomNavbarProfile;