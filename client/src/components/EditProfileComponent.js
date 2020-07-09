import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import { Button, Container, Form, Segment, TextArea } from "semantic-ui-react";

import { UserContext } from "../context/UserContext";
import ImageService from "../services/image.service";
import UserService from "../services/user.service";

// TODO: 1) Find a way to refactor and optimize code (and follow DRY). 2) Rerender component on imageupload
// TODO: 3) Refactor into multiple components
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

const EditProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //   Images
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  //    About
  //   const [aboutCharactersLeft, setAboutCharactersLeft] = useState(500);

  useEffect(() => {
    if (currentUser) {
      ImageService.get(currentUser.id)
        .then((res) => {
          setImageOne(res.data[0].url);
          setImageTwo(res.data[1].url);
          setImageThree(res.data[2].url);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser, imageOne]);

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
          url: response.data.secure_url,
          order: 1,
          userId: currentUserId,
        };

        //Post info to DB
        ImageService.create(imageData);

        // Get the image so that we can display it
        ImageService.get(imageData.id)
          .then((res) => {
            setImageOne(imageData.url);
          })
          .catch((e) => {
            console.log(e);
          });
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
          url: response.data.secure_url,
          order: 2,
          userId: currentUserId,
        };

        //Post info to DB
        ImageService.create(imageData);

        // Get the image so that we can display it
        ImageService.get(imageData.id)
          .then((res) => {
            setImageTwo(imageData.url);
          })
          .catch((e) => {
            console.log(e);
          });
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
          url: response.data.secure_url,
          order: 3,
          userId: currentUserId,
        };

        //Post info to DB
        ImageService.create(imageData);

        // Get the image so that we can display it
        ImageService.get(imageData.id)
          .then((res) => {
            setImageThree(imageData.url);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  };

  const deletePhoto = async (e) => {
    // const res = await axios.delete
    e.preventDefault();
  };

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
            {imageOne ? (
              <UploadImage1>
                <div>
                  <img src={imageOne} alt="Default" />
                  <button onClick={deletePhoto}>x</button>
                </div>
              </UploadImage1>
            ) : (
              <UploadImage1 onClick={() => initialFileInput1.click()}>
                <div>
                  <button>+</button>
                </div>
              </UploadImage1>
            )}

            {imageTwo ? (
              <UploadImage2>
                <div>
                  <img src={imageTwo} alt="Second" />
                  <button onClick={deletePhoto}>x</button>
                </div>
              </UploadImage2>
            ) : (
              <UploadImage2 onClick={() => initialFileInput2.click()}>
                <div>
                  <button>+</button>
                </div>
              </UploadImage2>
            )}

            {imageThree ? (
              <UploadImage3>
                <div>
                  <img src={imageThree} alt="Third" />
                  <button onClick={deletePhoto}>x</button>
                </div>
              </UploadImage3>
            ) : (
              <UploadImage3 onClick={() => initialFileInput3.click()}>
                <div>
                  <button>+</button>
                </div>
              </UploadImage3>
            )}
          </EditPhotosContainer>

          <h3>About</h3>
          <Form>
            <TextArea
              label="About"
              className="about"
              style={{ minHeight: 100, maxHeight: 100 }}
              //   maxLength={}
              placeholder="I like long walks on the beach..."
            />
            <Form.Input label="Job Title" type="" placeholder="Add Job Title" />

            <Button color="red" fluid>
              Save
            </Button>
          </Form>
        </Segment>
      </ProfileCard>
    </div>
  );
};

export default EditProfileComponent;
