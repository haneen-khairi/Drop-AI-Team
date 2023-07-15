import React from 'react';
import HeaderProfile from '../components/profile/HeaderProfile';
import ProfileSidebar from '../components/ProfileSidebar';
import '../assets/styles/pages/profile.css';
const Profile: React.FC = () => {


    return (
        <div>
            <HeaderProfile />


            <ProfileSidebar />
            <div className="container contect app-container">
                <form>
                    <div className="form-group">

                        <input
                            type="file"
                            id="mobile_number"

                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">First name</label>
                        <input
                            type="text"
                            id="mobile_number"
                            placeholder="First name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Last name</label>
                        <input
                            type="text"
                            id="mobile_number"
                            placeholder="Last name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Phone number</label>
                        <input
                            type="number"
                            id="mobile_number"
                            placeholder="Phone number"
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary loginbtn">Update Profile</button>



                </form>
            </div>
        </div>

    );
};

export default Profile;
