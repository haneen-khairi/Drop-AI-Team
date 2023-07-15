import React from 'react';
import logo from '../assets/img/LOGO.svg';
import CustomNavbar from './CustomNavbar';
interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    // const [activeKey, setActiveKey] = React.useState("1");

    return (
        <header className={className}>
            {className == 'home-header' &&
                <div className='bg-effect' >
                    <div className='blob-one'></div>
                    <div className='blob-two'></div>
                    <div className='blob-three'></div>
                </div>
            }
            <img src={logo} className='logo' alt="logo_img" />
            {/* <CustomNavbar appearance="subtle" activeKey={activeKey} onSelectNav={setActiveKey} /> */}
            <CustomNavbar appearance="subtle" />
        </header>
    );
};

export default Header;
