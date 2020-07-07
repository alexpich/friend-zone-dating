import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const ProfileCard = styled.div`
  border: 1px solid black;
  height: 50vh;
  .name {
    text-transform: capitalize;
  }
`;

const EditPhotosContainer = styled.div`
  display: flex;
`;

const Photo = styled.img`
  width: 33%;
`;

const uploadFile = async (e) => {
  console.log("Uploading image...");
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "friendzone");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/bpeach/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
};

const EditProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <h1>EditProfileComponent</h1>
      <ProfileCard>
        <EditPhotosContainer>
          <Photo />
        </EditPhotosContainer>
        <p>id: {currentUser.id}</p>
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={uploadFile}
        />
        <p className="name">
          {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span>
        </p>
      </ProfileCard>
    </div>
  );
};

export default EditProfileComponent;
