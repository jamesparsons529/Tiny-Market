import React, { useState } from 'react';
import {UserSession } from "@stacks/connect";
import AssetCard from '../AssetCard';
import TestNetNFTSList from '../TestNetNFTSList';
export const userSession = new UserSession();


function Profile() {
  // Initialise the state for the profile
  const [profile, setProfile] = useState({
    name: "John Smith",
    profileImage: null, // Initially no profile image
  });

  // Function to handle file input change (uploading profile image)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Set profile image to the uploaded file
        setProfile({ ...profile, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileImageInput").click();
  };
  return (
    <main>
      <section className="profile-container">
        <div className="profile-info">
          <img
          //via.placeholder.com is a website that allows for images to be temperarily uploaded
            src={profile.profileImage || "https://via.placeholder.com/150"} 
            alt="Profile"
            className="profile-pic"
            onClick={triggerFileInput}
            style={{cursor: 'pointer'}}
          />
          <h1>{profile.name}</h1>
          <p>Wallet Address: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
          <p>Available funds: 2.5 ETH</p>
          <input 
            type="file" 
            accept="image/*" 
            id= "profileImageInput"
            style={{ display:'none'}}
            onChange={handleImageUpload} 
          />
        </div>
        <div className="profile-actions">
          <button>My Transactions</button>
          <button>Edit Profile</button>
        </div>
        <div>
          <h1>My Testnet Assets</h1>
          <TestNetNFTSList /> 
        </div>
        <div>
          <h1>My Mainnet Assets</h1>
          <AssetCard />
        </div>
        
      </section>      
    </main>
  );
}

export default Profile;