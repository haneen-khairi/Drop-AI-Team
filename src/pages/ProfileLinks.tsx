import React, { useState , useEffect } from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';
import { Button, Form, ButtonToolbar, Modal, Input } from 'rsuite';
import { Link } from 'react-router-dom';
import axios from 'axios';
interface Link {
    page_name: string;
    page_link: string;
  }

const ProfileLinks: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newLink, setNewLink] = useState('');
    const [links, setLinks] = useState<Link[]>([]);
  

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleShow = () => {
        handleOpen();
    }
    const getPageLinks = async() => {
        await axios.get(`https://dropshipping-app-ingsl.ondigitalocean.app/account/get_pages/`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((data) => {
            console.log('get links', data.data)
            setLinks(data.data)
        }).catch((error) => {
            console.log('error in links',error)
        })
    }
    const handleAddLink = () => {
        const newLinkObject: Link = { page_name: newName, page_link: newLink };
        axios.post(`https://dropshipping-app-ingsl.ondigitalocean.app/account/add_pages/`, {
            page_name: newName, 
            page_link: newLink
        }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }}).then((data) => {
            console.log('add link',data)
        }).catch((error) => {
            console.log('error in add link', error)
        }) 
        setLinks(prevLinks => [...prevLinks, newLinkObject]);
        setNewName('');
        setNewLink('');
        handleClose();
    }
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
            getPageLinks()
            getUserdata()
    }, [])
    return (
        <div>
            <HeaderProfile userData={userData} />
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

                {links.map((link, index) => (
                    <div className="links" key={index}>
                        <h3 className="links">{link.page_name}</h3>
                        <Link to={link.page_link} target="_blank" rel="noopener noreferrer">
                {link.page_link}
              </Link>
                    </div>
                ))}

                <button onClick={handleShow} type="submit" className="btn btn-primary loginbtn addlink links">
                    <img src={addlink} alt="Add link" />
                    Add link
                </button>

                <Modal overflow={true} open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalbod'>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.ControlLabel>Add Name</Form.ControlLabel>
                                <Input
                                    style={{ width: 400 }}
                                    placeholder="Add Name"
                                    value={newName}
                                    onChange={(value) => setNewName(value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="textarea">
                                <Form.ControlLabel>Add Link</Form.ControlLabel>
                                <Input
                                    as="textarea"
                                    rows={3}
                                    placeholder="https://loremLorem ipsum dolor sit amet consectetur lorem Lorem ipsum dolor sit amet consectetur.  .  "
                                    value={newLink}
                                    onChange={(value) => setNewLink(value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button
                                        appearance="primary"
                                        className='addButton'
                                        type='submit'
                                        onClick={handleAddLink}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        appearance="default"
                                        onClick={handleClose}
                                        className='cancelButton'
                                    >
                                        Cancel
                                    </Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default ProfileLinks;
