import React, { useState } from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import addlink from '../assets/img/profile/Addlink.svg';
import '../assets/styles/pages/profile.css';
import { Button, Form, ButtonToolbar, Modal, Input } from 'rsuite';
import { Link } from 'react-router-dom';
interface Link {
    name: string;
    link: string;
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

    const handleAddLink = () => {
        const newLinkObject: Link = { name: newName, link: newLink };
        setLinks(prevLinks => [...prevLinks, newLinkObject]);
        setNewName('');
        setNewLink('');
        handleClose();
    }

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

                {links.map((link, index) => (
                    <div className="links" key={index}>
                        <h3 className="links">{link.name}</h3>
                        <Link to={link.link} target="_blank" rel="noopener noreferrer">
                {link.link}
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
