import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import UserService from "../services/user.service";
import ImageService from "../services/image.service";
import LikesService from "../services/likes.service";

const PhotosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    object-fit: cover;
    width: 100%;
    height: 400px;
  }
`;

const Card = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const initialState = {
    id: null,
    email: null,
    firstName: null,
    latitude: null,
    longitude: null,
  };

  const [profiles, setProfiles] = useState([]);
  const [images, setImages] = useState(null);
  const [currentProfileShownId, setCurrentProfileShownId] = useState(null);

  // Get the 20 profiles
  useEffect(() => {
    UserService.getTwentyUsers()
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Get the image of the first profile
  useEffect(() => {
    // console.log("displaying the profiles...");
    console.log(profiles);
    profiles.map((data) => {
      let userId = data.id;
      console.log(data.id);
      //   setCurrentProfileShownId();
      ImageService.get(data.id)
        .then((res) => {
          console.log(res);
          setImages(res.data[0].url);
          //   set
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, [profiles]);

  const pass = (id, otherId) => {
    // post a Like value of 0 for pass
    LikesService.create(currentUser.id);
  };
  const like = () => {
    // post a Like value of 1 for like
  };

  return (
    <div>
      <PhotosContainer>
        {/* {imageOne ? <img src={imageOne} alt="Default" /> : ""}
        {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
        {imageThree ? <img src={imageThree} alt="Third" /> : ""} */}
        {images ? <img src={images} alt="Default" /> : ""}
      </PhotosContainer>
      <button onClick={pass}>PASS</button>
      <button onClick={like}>LIKE</button>
      <p className="name">
        {/* {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span> */}
      </p>
    </div>
  );
};

export default Card;
