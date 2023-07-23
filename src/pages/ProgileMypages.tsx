
import React, { useState } from 'react';
import Popup from './../components/profile/Popup';

import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';
import { Button, Modal } from 'rsuite';
const ProgileMypages: React.FC = () => { 


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  

    const handleShow = () => { 
        handleOpen();
    }


    return (
        <div>
            <HeaderProfile />


            <ProfileSidebar />
            <div className="container contect app-container">
                {/* <button onClick={handleOpenPopup} type="submit" className="btn btn-primary loginbtn addlink">
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
                        {/* <button type="submit" className="btn btn-primary Cancel">Cancel</button>  



                    </form>
                </Popup> */}

                <Modal overflow={true} open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>NLP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalbod'>
                       
                                <p>fdas</p> 
                    </Modal.Body>
                </Modal>
                <Button onClick={handleShow} style={{ paddingRight: "120px", paddingLeft: "120px" }} size="lg" className='filter-btn' color='violet' appearance="primary">
                    Show NLP
                </Button>
            </div>
        </div>

    );
};

export default ProgileMypages;
