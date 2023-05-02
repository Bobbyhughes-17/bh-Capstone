import React, { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "../ApiManager";
import Authorized from "../Authorized";

function ProfileDashboard() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
  });

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser(users[0].id, formData)
      .then((updatedUser) => {
        alert("User information updated successfully!");
        setShowForm(false);
        setUsers([updatedUser, ...users.slice(1)]);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Authorized>
      <div className="profile-container">
        <h2 className="profile-heading">Welcome, {users[0]?.name}!</h2>
        
          <div className="profile-details-column">
            <div className="email">
            <p className="profile-details-label">Email:</p>
            <p className="profile-details-value">{users[0]?.email}</p>
            </div>
            <div className="username">
            <p className="profile-details-label">Username:</p>
            <p className="profile-details-value">{users[0]?.username}</p>
            </div>
            <div className="bio">
            <p className="profile-details-label">Bio: </p>
            <p className="profile-details-value">{users[0]?.bio}</p>
          </div>
          </div>
          <div className="profile-actions">
            {!showForm ? (
              <button
                className="profile-action-button profile-action-edit"
                onClick={() => setShowForm(true)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="profile-action-button profile-action-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            )}
          </div>
        
        
        {showForm && (
          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <div className="form-field">
            
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
             
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
           
              <input
                className="form-input"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <input
                className="form-input one"
                id="bio"
                type="text"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button className="form-button form-button-save" type="submit">
                Save
              </button>
              <button
                className="form-button form-button-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Authorized>
  );
}

export default ProfileDashboard;
