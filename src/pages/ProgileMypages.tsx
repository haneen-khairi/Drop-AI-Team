
import React, { useState , useEffect } from 'react';
import Popup from './../components/profile/Popup';

import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';
import { Button, Modal } from 'rsuite';
import axios from 'axios';
const ProgileMypages: React.FC = () => { 

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        image: null as any
    })
    async function getUserdata(){
      await axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/account/get_profile/`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }).then((data) => {
          console.log('geting profile data',data)
          setUserData(data.data.data)
      }).catch((error) => {
          console.log('error in geting profile',error)
      })
    }
    useEffect(() => {
      
      getUserdata()
  }, [])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  

    const handleShow = () => { 
        handleOpen();
    }


    return (
        <div>
            <HeaderProfile userData={userData} />


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
