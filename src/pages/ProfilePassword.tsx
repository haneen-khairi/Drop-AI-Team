import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import '../assets/styles/pages/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ProfilePassword: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
    const [passwordObject, setPasswordObject] = useState({
      currentPassword: "",
      password: "",
      confirmPassword: ""
    })
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
  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>){
    // const passwords = {...passwordObject}
    const { name, value } = e.target;
    const data = { ...passwordObject, [name]: value.trim() };  
    setPasswordObject(data)
  }
  async function changePassword(){
    axios.put(`https://dropshipping-app-ingsl.ondigitalocean.app/account/update_password/`, {
      current_password: passwordObject.currentPassword, 
      new_password1: passwordObject.password,
      new_password2: passwordObject.confirmPassword
    }, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }}).then((data) => {
        console.log('change pass',data.data)
        if(data.data.error){
          setError(data.data.error)
        }else{
          setSuccess('data')
        }

    }).catch((error) => {
        console.log('error in change pass', error)
        setError(error.data.data.error)
    })
  }
  function onUpdatePassword(event: React.FormEvent){
    event.preventDefault();
    changePassword();
  }
  useEffect(() => {
    console.log('sadas')
    if(!localStorage.getItem('token')){
        navigate('/')
    }
    getUserdata()
}, [])
    return (
        <div>
            <HeaderProfile userData={userData} />
           
         
            <ProfileSidebar />
            <div className="container contect app-container">
   
      
              
            <form onSubmit={onUpdatePassword}>
            <h5 className="pt-4">Password settings</h5>
          <div className="form-group">
            {error && <div className="alert alert-danger" role="alert">
              <strong>{error}</strong>
            </div>}
            {success && <div className="alert alert-success" role="alert">
              <strong>{success}</strong>
            </div>}
          <label htmlFor="mobile_number">Current Password</label>
            <input
              type="password"
              onChange={onChangePassword}
              name='currentPassword'
              id="mobile_number"
              placeholder="Current password"
              className="form-control mt-2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">New password</label>
            <input
              type="password"
              onChange={onChangePassword}
              name='password'
              id="mobile_number"
              placeholder="New password"
              className="form-control mt-2"
            />
          </div>
           
          <div className="form-group">
            <label htmlFor="mobile_number ">Confirm new password</label>
            <input
              type="password"
              onChange={onChangePassword}
              name='confirmPassword'
              id="mobile_number"
            placeholder="Confirm new password"
              className="form-control mt-2"
            />
          </div>
          
          <button type="submit" className="btn btn-primary loginbtn">Update Password</button>
        
         

        </form>
            </div>
        </div>
        
    );
};

export default ProfilePassword;
