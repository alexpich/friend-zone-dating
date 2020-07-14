import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  Button,
  Form,
  Segment,
  TextArea,
} from "semantic-ui-react";
import Select from "react-select";

import { UserContext } from "../context/UserContext";
import ImageService from "../services/image.service";
import UserDetailsService from "../services/userDetails.service";

// TODO: 1) Find a way to refactor and optimize code (and follow DRY). 2) Rerender component on imageupload
// TODO: 3) Refactor into multiple components
const ProfileCard = styled.div`
  /* border: 1px solid black; */
  /* height: 600px; */
  background-color: yellow;
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
  div {
    position: relative;
    .imagePlaceholder {
      width: 120px;
      height: 150px;
    }
  }
  div > button {
    position: absolute;
    bottom: 6px;
    right: 2px;
    z-index: 10;
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
  // Current user
  const { currentUser, setCurrentUser } = useContext(UserContext);

  //   Loading state
  const [isLoading, setIsLoading] = useState(false);

  //   Initial state
  const initialUserDetails = {
    about: "",
    jobTitle: "",
    school: "",
    location: "",
    gender: "",
    preference: "",
    userId: null,
  };

  //   User Details
  const [userDetails, setUserDetails] = useState(initialUserDetails);

  //   Images
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageOneId, setImageOneId] = useState(null);
  const [imageTwoId, setImageTwoId] = useState(null);
  const [imageThreeId, setImageThreeId] = useState(null);

  //    About
  //   let initialCharacterMax = 500 - userDetails.about.length;
  let initialCharacterMax = 500;
  const [aboutCharactersLeft, setAboutCharactersLeft] = useState(
    initialCharacterMax
  );

  //   Retrieves images after render
  useEffect(() => {
    if (currentUser) {
      ImageService.get(currentUser.id)
        .then((res) => {
          if (res.data[0] !== null) {
            setImageOne(res.data[0].url);
            setImageOneId(res.data[0].id);
          }
          if (res.data[1] !== null) {
            setImageTwo(res.data[1].url);
            setImageTwoId(res.data[1].id);
          }
          if (res.data[2] !== null) {
            setImageThree(res.data[2].url);
            setImageThreeId(res.data[2].id);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [
    currentUser,
    imageOne,
    imageTwo,
    imageThree,
    imageOneId,
    imageTwoId,
    imageThreeId,
  ]);

  // Retrieve User details after render
  useEffect(() => {
    UserDetailsService.get(currentUser.id)
      .then((res) => {
        const response = res.data[0];
        setUserDetails(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const genderOptions = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Other", label: "Other" },
  ];

  const preferenceOptions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Any", label: "Any" },
  ];

  let initialFileInput1 = null;
  let initialFileInput2 = null;
  let initialFileInput3 = null;

  // Uploading images
  const uploadFile = async (e) => {
    let id = e.target.id;
    console.log("the uploaded id is:" + id);

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
        // const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const imageData = {
          url: response.data.secure_url,
          order: id,
          userId: currentUser.id,
        };

        //Post info to DB
        ImageService.create(imageData);

        // Get the image so that we can display it
        ImageService.get(imageData.id)
          .then((res) => {
            if (id == 1) {
              setImageOne(imageData.url);
              setImageOneId(imageData.id);
            } else if (id == 2) {
              setImageTwo(imageData.url);
              setImageTwoId(imageData.id);
            } else if (id == 3) {
              setImageThree(imageData.url);
              setImageThreeId(imageData.id);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  };

  const deletePhoto = async (e) => {
    e.preventDefault();

    // Delete the image from the database
    let id = e.target.id;
    console.log("the photo to be deleted is: " + id);
    if (id == 1) {
      ImageService.delete(imageOneId);
      setImageOneId(null);
    }
    if (id == 2) {
      console.log(imageTwo);
      ImageService.delete(imageTwoId);
      setImageTwoId(null);
    }
    if (id == 3) {
      ImageService.delete(imageThreeId);
      setImageThreeId(null);
    }
    console.log("Deleting photo...");
  };

  const updateDetails = (e) => {
    console.log("Saving...");
    UserDetailsService.update(currentUser.id, userDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (e, result) => {
    const { name, value } = result || e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    let charactersLeft = 500 - userDetails.about.length;
    console.log(charactersLeft);
    setAboutCharactersLeft(charactersLeft);
  };

  const handleSelectChange = (value, action) => {
    setUserDetails({
      ...userDetails,
      [action.name]: value.value,
    });
  };

  return (
    <div>
      <ProfileCard>
        <Segment style={{ overflow: "auto", maxHeight: 600 }}>
          <input
            style={{ display: "none" }}
            type="file"
            id={1}
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
            ref={(fileInput) => (initialFileInput1 = fileInput)}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id={2}
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
            ref={(fileInput) => (initialFileInput2 = fileInput)}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id={3}
            name="file"
            placeholder="Upload an image"
            required
            onChange={uploadFile}
            ref={(fileInput) => (initialFileInput3 = fileInput)}
          />
          <EditPhotosContainer>
            {imageOne ? (
              <UploadImage1>
                <div>
                  <img src={imageOne} alt="Default" />
                  <button id={1} onClick={deletePhoto}>
                    x
                  </button>
                </div>
              </UploadImage1>
            ) : (
              <UploadImage1 onClick={() => initialFileInput1.click()}>
                <div>
                  <div className="imagePlaceholder"></div>
                  <button>+</button>
                </div>
              </UploadImage1>
            )}

            {imageTwo ? (
              <UploadImage2>
                <div>
                  <img src={imageTwo} alt="Second" />
                  <button id={2} onClick={deletePhoto}>
                    x
                  </button>
                </div>
              </UploadImage2>
            ) : (
              <UploadImage2 onClick={() => initialFileInput2.click()}>
                <div>
                  <div className="imagePlaceholder"></div>
                  <button>+</button>
                </div>
              </UploadImage2>
            )}

            {imageThree ? (
              <UploadImage3>
                <div>
                  <img src={imageThree} alt="Third" />
                  <button id={3} onClick={deletePhoto}>
                    x
                  </button>
                </div>
              </UploadImage3>
            ) : (
              <UploadImage3 onClick={() => initialFileInput3.click()}>
                <div>
                  <div className="imagePlaceholder"></div>
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
              name="about"
              placeholder="I like long walks on the beach and gazing upon the stars..."
              style={{ minHeight: 100, maxHeight: 100 }}
              maxLength={500}
              defaultValue={userDetails.about}
              onChange={handleChange}
            />
            <p>{aboutCharactersLeft}</p>

            <Form.Input
              label="Job Title"
              name="jobTitle"
              placeholder="Add Job Title"
              defaultValue={userDetails.jobTitle}
              onChange={handleChange}
            />

            {/* TODO: Search school */}
            <Form.Input
              label="School"
              name="school"
              placeholder="Add School"
              defaultValue={userDetails.school}
              onChange={handleChange}
            />

            {/* TODO: Search location */}
            <Form.Input
              label="Location"
              name="location"
              placeholder="Add Location"
              defaultValue={userDetails.location}
              onChange={handleChange}
            />

            <p>Gender</p>
            <Select
              name="gender"
              placeholder={userDetails.gender}
              options={genderOptions}
              defaultValue={userDetails.gender}
              onChange={handleSelectChange}
            />

            <p>Preference</p>
            <Select
              name="preference"
              placeholder={userDetails.preference}
              options={preferenceOptions}
              defaultValue={userDetails.preference}
              onChange={handleSelectChange}
            />
            <Button onClick={updateDetails} color="red" fluid>
              Save
            </Button>
          </Form>
        </Segment>
      </ProfileCard>
    </div>
  );
};

export default EditProfileComponent;
