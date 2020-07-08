import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ImageService from "../services/image.service";
import UserService from "../services/user.service";

const ProfileCard = styled.div`
  border: 1px solid black;
  height: 50vh;
  .name {
    text-transform: capitalize;
  }
`;

const EditPhotosContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadImage1 = styled.div`
  background: #ededed;
  width: 120px;
  height: 150px;
  img {
    object-fit: cover;
    width: 120px;
    height: 150px;
  }
`;

const UploadImage2 = styled.div`
  background: #ededed;
  width: 120px;
  height: 150px;
`;

const UploadImage3 = styled.div`
  background: #ededed;
  width: 120px;
  height: 150px;
`;

const uploadFile = async (e) => {
  console.log("Uploading image...");
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "friendzone");

  // Posts to Cloudinary
  const res = await axios
    .post("https://api.cloudinary.com/v1_1/bpeach/image/upload", data, {
      onUploadProgress: (progressEvent) => {
        //   TODO: Animate this
        console.log(
          "Upload progress:" +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%"
        );
      },
    })
    .then((response) => {
      const currentUserId = JSON.parse(localStorage.getItem("user")).id;
      const imageData = {
        url: response.data.url,
        order: 1,
        userId: currentUserId,
      };

      //Post info to DB
      ImageService.create(imageData);
    })
    .catch((e) => console.log(e));
};

const EditProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [hasImage, setHasImage] = useState(false);
  const [imageOne, setImageOne] = useState(null);

  useEffect(() => {
    if (currentUser) {
      ImageService.get(currentUser.id)
        .then((res) => {
          setHasImage(true);
          setImageOne(res.data[0].url);
          console.log(res.data[0].url);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  let initialFileInput1 = null;
  let initialFileInput2 = null;
  let initialFileInput3 = null;

  return (
    <div>
      <h1>EditProfileComponent</h1>
      <ProfileCard>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={uploadFile}
          ref={(fileInput) => (initialFileInput1 = fileInput)}
        />
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={uploadFile}
          ref={(fileInput) => (initialFileInput2 = fileInput)}
        />
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          required
          onChange={uploadFile}
          ref={(fileInput) => (initialFileInput3 = fileInput)}
        />
        <EditPhotosContainer>
          <UploadImage1 onClick={() => initialFileInput1.click()}>
            {imageOne ? <img src={imageOne} alt="Default" /> : ""}
          </UploadImage1>
          <UploadImage2 onClick={() => initialFileInput2.click()} />
          <UploadImage3 onClick={() => initialFileInput3.click()} />
        </EditPhotosContainer>
        <p>id: {currentUser.id}</p>

        <p className="name">
          {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span>
        </p>
      </ProfileCard>
    </div>
  );
};

export default EditProfileComponent;
