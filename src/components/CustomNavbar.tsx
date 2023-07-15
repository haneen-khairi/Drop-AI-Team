import React from 'react';
import { Navbar } from 'rsuite';
import { Link } from 'react-router-dom';

// interface CustomNavbarProps extends React.ComponentProps<typeof Navbar> {
//     onSelectNav: (eventKey: string) => void;
//     activeKey: string;
// }

const CustomNavbar: React.FC<React.ComponentProps<typeof Navbar>> = () => {
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
                <Link className='nav-item' to={`/bestseller`}>Ask AI</Link>
                <Link className='nav-item' to={`/social-search`}>Social Search</Link>
                <Link className='nav-item btn btn-primary' to={`/login`}>Sign up</Link>
            </ul>
        </nav>
    );
};

export default CustomNavbar;