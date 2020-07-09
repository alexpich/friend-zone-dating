import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import { Container, Form, Segment, TextArea } from "semantic-ui-react";

import { UserContext } from "../context/UserContext";
import ImageService from "../services/image.service";
import UserService from "../services/user.service";

// TODO: 1) Find a way to refactor and optimize code (and follow DRY). 2) Rerender component on imageupload

const ProfileCard = styled.div`
  /* border: 1px solid black; */
  /* height: 600px; */
  .name {
    text-transform: capitalize;
  }

  .about {
    resize: none;
  }
`;

const EditPhotosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    object-fit: cover;
    width: 120px;
    height: 150px;
  }
`;

const UploadImage1 = styled.div`
  background: #ededed;
  width: 120px;
  height: 150px;
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
    // TODO: Rewrite this to use async await later
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

const uploadFile2 = async (e) => {
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
    // TODO: Rewrite this to use async await later
    .then((response) => {
      const currentUserId = JSON.parse(localStorage.getItem("user")).id;
      const imageData = {
        url: response.data.url,
        order: 2,
        userId: currentUserId,
      };

      //Post info to DB
      ImageService.create(imageData);
    })
    .catch((e) => console.log(e));
};

const uploadFile3 = async (e) => {
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
    // TODO: Rewrite this to use async await later
    .then((response) => {
      const currentUserId = JSON.parse(localStorage.getItem("user")).id;
      const imageData = {
        url: response.data.url,
        order: 3,
        userId: currentUserId,
      };

      //Post info to DB
      ImageService.create(imageData);
    })
    .catch((e) => console.log(e));
};

const EditProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //   Images
  const [hasImage, setHasImage] = useState(false);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  //    About
  //   const [aboutCharactersLeft, setAboutCharactersLeft] = useState(500);

  useEffect(() => {
    if (currentUser) {
      ImageService.get(currentUser.id)
        .then((res) => {
          setHasImage(true);
          setImageOne(res.data[0].url);
          setImageTwo(res.data[1].url);
          setImageThree(res.data[2].url);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser, imageOne]);

  let initialFileInput1 = null;
  let initialFileInput2 = null;
  let initialFileInput3 = null;

  return (
    <div>
      {/* <h1>EditProfileComponent</h1> */}
      <ProfileCard>
        <Segment style={{ overflow: "auto", maxHeight: 600 }}>
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
            onChange={uploadFile2}
            ref={(fileInput) => (initialFileInput2 = fileInput)}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile3}
            ref={(fileInput) => (initialFileInput3 = fileInput)}
          />
          <EditPhotosContainer>
            <UploadImage1 onClick={() => initialFileInput1.click()}>
              {imageOne ? <img src={imageOne} alt="Default" /> : ""}
            </UploadImage1>
            <UploadImage2 onClick={() => initialFileInput2.click()}>
              {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
            </UploadImage2>
            <UploadImage3 onClick={() => initialFileInput3.click()}>
              {imageThree ? <img src={imageThree} alt="Third" /> : ""}
            </UploadImage3>
          </EditPhotosContainer>

          {/* <p className="name">
            {currentUser.firstName + " " + currentUser.lastName},{" "}
            <span>Age</span>
          </p> */}

          <h3>About</h3>
          <Form>
            <TextArea
              className="about"
              style={{ minHeight: 100, maxHeight: 100 }}
              //   maxLength={}
              placeholder="I like long walks on the beach..."
            />
          </Form>
        </Segment>
      </ProfileCard>
    </div>
  );
};

export default EditProfileComponent;
