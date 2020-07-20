import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserService from "../services/user.service";

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
  // const initialState = {
  //     []
  // }
  const initialState = null;

  const [profiles, setProfiles] = useState(initialState);

  useEffect(() => {
    UserService.getTwentyUsers()
      .then((res) => {
        console.log(res);
        //   setProfiles(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log("displaying the profiles...");
    console.log(profiles);
  }, [profiles]);

  return (
    <div>
      <PhotosContainer>
        {/* {imageOne ? <img src={imageOne} alt="Default" /> : ""}
        {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
        {imageThree ? <img src={imageThree} alt="Third" /> : ""} */}
      </PhotosContainer>
      <p className="name">
        {/* {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span> */}
      </p>
    </div>
  );
};

export default Card;
