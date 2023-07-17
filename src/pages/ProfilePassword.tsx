import React from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import '../assets/styles/pages/profile.css';
const ProfilePassword: React.FC = () => {


    return (
        <div>
            <HeaderProfile />
           
         
            <ProfileSidebar />
            <div className="container contect app-container">
   
      
              
            <form>
            <h5 className="pt-4">Password settings</h5>
          <div className="form-group">
          <label htmlFor="mobile_number">Current Password</label>
            <input
              type="password"
              id="mobile_number"
            placeholder="Current password"
              className="form-control mt-2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">New password</label>
            <input
              type="password"
              id="mobile_number"
            placeholder="New password"
              className="form-control mt-2"
            />
          </div>
           
          <div className="form-group">
            <label htmlFor="mobile_number ">Confirm new password</label>
            <input
              type="password"
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
