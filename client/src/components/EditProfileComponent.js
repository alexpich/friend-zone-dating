import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  Button,
  Form,
  Segment,
  TextArea,
  Dropdown,
  Label,
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
    userId: 1,
  };

  //   User Details
  const [userDetails, setUserDetails] = useState(initialUserDetails);

  //   Images
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  //   Retrieves images after render
  useEffect(() => {
    if (currentUser) {
      ImageService.get(currentUser.id)
        .then((res) => {
          if (res.data[0] !== null) {
            setImageOne(res.data[0].url);
          }
          if (res.data[1] !== null) {
            setImageTwo(res.data[1].url);
          }
          if (res.data[2] !== null) {
            setImageThree(res.data[2].url);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser, imageOne]);

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

  //    About
  //   const [aboutCharactersLeft, setAboutCharactersLeft] = useState(500);

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

  // Uploading images
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
        // const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const imageData = {
          url: response.data.secure_url,
          order: 1,
          userId: currentUser.id,
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
        // const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const imageData = {
          url: response.data.secure_url,
          order: 2,
          userId: currentUser.id,
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
        // const currentUserId = JSON.parse(localStorage.getItem("user")).id;
        const imageData = {
          url: response.data.secure_url,
          order: 3,
          userId: currentUser.id,
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
    console.log("Deleting photo...");
    e.preventDefault();
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
    console.log(result);
  };

  const handleSelectChange = (value, action) => {
    setUserDetails({
      ...userDetails,
      [action.name]: value.value,
    });
    console.log(userDetails);
  };

  let initialFileInput1 = null;
  let initialFileInput2 = null;
  let initialFileInput3 = null;

  return (
    <div>
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
                  <div className="imagePlaceholder"></div>
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
                  <div className="imagePlaceholder"></div>
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
              //   maxLength={}
              defaultValue={userDetails.about}
              onChange={handleChange}
            />

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

            {/* <Form.Input
              label="Gender"
              name="gender"
              placeholder="Gender"
              defaultValue={userDetails.gender}
              onChange={handleChange}
            /> */}

            {/* <Dropdown
              label="gender"
              name="gender"
              placeholder={userDetails.gender}
              options={options}
              defaultValue={userDetails.gender}
              selection
              onChange={handleChange}
            /> */}

            {/* <Form.Dropdown
              label="Gender"
              name="gender"
              selection
              //   control={Dropdown}
              placeholder={userDetails.gender}
              options={genderOptions}
              defaultValue={userDetails.gender}
              onChange={handleChange}
            /> */}
            <p>Gender</p>
            <Select
              name="gender"
              placeholder={userDetails.gender}
              options={genderOptions}
              defaultValue={userDetails.gender}
              //   onChange={handleChange}
              onChange={handleSelectChange}
            />

            {/* <Form.Input
              label="Preference"
              name="preference"
              placeholder="Preference"
              defaultValue={userDetails.preference}
              onChange={handleChange}
            /> */}

            {/* <Form.Field
              label="Preference"
              name="preference"
              selection
              control={Dropdown}
              placeholder={userDetails.preference}
              options={preferenceOptions}
              defaultValue={userDetails.preference}
              onChange={handleChange}
            /> */}

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
