import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import '../assets/styles/pages/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile: React.FC = () => {
    const navigate = useNavigate()
    
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        image: null as any
    })
    function onChangeUserInfo(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event);
        const { name, value } = event.target;
        const data = { ...userData, [name]: value.trim() };
        console.log(data);
        setUserData(data);
    }
    function submitLogic(){
        console.log(userData.image)
        console.log(typeof userData.image)
        const formData = new FormData();
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        if(typeof userData.image !== 'string'){
            formData.append('image', userData.image);
        }
        formData.append('mobile_number', userData.mobile_number);
            axios.put(`https://dropshipping-app-ingsl.ondigitalocean.app/account/edit_profile/`, 
                
                formData
            , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((data) => {
                console.log('submitted',data)
                setUserData(data.data.data)
                // if(data.data.data.access){
                //     localStorage.setItem('token', data.data.data.access)
                //     window.location.href = '/'
                // }
                // else if(data.data.error.mobile_number){
                //     setErrorMessage(data.data.error.mobile_number)
                // }
            }).catch((error) => {
                console.log('error in submitting' , error)
            })

    }
    function changeImage(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files[0])
            const userDataInitialization = {...userData}

            userDataInitialization.image = event.target?.files[0]
            setUserData(userDataInitialization)
            console.log(userDataInitialization)
        }

    }
     function onUpdateProfile(event: React.FormEvent){
        event.preventDefault();
        submitLogic()
    } 
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
        console.log('sadas')
        if(!localStorage.getItem('token')){
            navigate('/')
        }
        getUserdata()
    }, [])
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    return (
        <div>
            <HeaderProfile  />


            <ProfileSidebar  />
            <div className="container contect app-container">
                <form onSubmit={onUpdateProfile}>
                    <div className="form-group">

                        <input
                            type="file"
                            id="mobile_number"
                            onChange={changeImage}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">First name</label>
                        <input
                            type="text"
                            id="first_name"
                            name='first_name'
                            onChange={onChangeUserInfo}
                            placeholder="First name"
                            className="form-control"
                            defaultValue={userData?.first_name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Last name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            onChange={onChangeUserInfo}

                            placeholder="Last name"
                            className="form-control"
                            defaultValue={userData?.last_name}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Phone number</label>
                        <input
                            type="number"
                            id="mobile_number"
                            name="mobile_number"
                            placeholder="Phone number"
                            onChange={onChangeUserInfo}

                            className="form-control"
                            defaultValue={userData?.mobile_number}

                        />
                    </div>

                    <button type="submit" className="btn btn-primary loginbtn">Update Profile</button>



                </form>
            </div>
        </div>

    );
};

export default Profile;
