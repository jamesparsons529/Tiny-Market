import React, { useState } from 'react';
import { UserSession } from "@stacks/connect";
import AssetCard from '../AssetCard';
import TestNetAssetCard from '../TestNetAssetCard';
import '../css/profile.css';
export const userSession = new UserSession();

function Profile() {
  const [profile, setProfile] = useState({
    name: "John Smith",
    profileImage: null, 
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileImageInput").click();
  };

  return (
    <main className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your profile and view your NFTs</p>
      </div>

      <section className="profile-container">
        <div className="profile-info">
          <img
            src={profile.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
            onClick={triggerFileInput}
            style={{ cursor: 'pointer' }}
          />
          <h1>{profile.name}</h1>
          <p>Mainnet Wallet Address: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
          <p>Testnet Wallet Address: {userSession.loadUserData().profile.stxAddress.testnet}</p>
          <input 
            type="file" 
            accept="image/*" 
            id="profileImageInput"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
        
        <div className="asset-section">
          <TestNetAssetCard />
        </div>

        <div className="asset-section">
          <AssetCard />
        </div>
      </section>
    </main>
  );
}

export default Profile;
