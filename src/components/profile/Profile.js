import React from 'react';
import ProfileDashboard from './ProfileDashboard';
import Authorized from '../Authorized';
import "./Profile.css"



function Profile() {
  return (
    <div>
     <h1 className="pro-head">Profile</h1>


      <Authorized>
      <ProfileDashboard />
      </Authorized>
    </div>
  );
}

export default Profile;
