import React from "react";
import ProfileDashboard from "./ProfileDashboard";
import Authorized from "../Authorized";
import "./Profile.css";

function Profile() {
  return (
    <div>
      <Authorized>
        <ProfileDashboard />
      </Authorized>
    </div>
  );
}

export default Profile;
