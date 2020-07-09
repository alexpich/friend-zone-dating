import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Segment } from "semantic-ui-react";

import ImageService from "../services/image.service";
import { UserContext } from "../context/UserContext";

// TODO: Change these photos from a grid pattern to a single picture that can be cycled through

const ProfileCard = styled.div`
  /* border: 1px solid black; */
  /* height: 50vh; */
  .name {
    text-transform: capitalize;
  }
`;

const PhotosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    object-fit: cover;
    width: 120px;
    height: 150px;
  }
`;

const ProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [hasImage, setHasImage] = useState(false);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

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

  return (
    <div>
      <h1>ProfileComponent</h1>
      {/* <p>{JSON.stringify(currentUser)}</p> */}
      <ProfileCard>
        <Segment style={{ overflow: "auto", maxHeight: 600 }}>
          <PhotosContainer>
            {imageOne ? <img src={imageOne} alt="Default" /> : ""}
            {imageTwo ? <img src={imageTwo} alt="Default" /> : ""}
            {imageThree ? <img src={imageThree} alt="Default" /> : ""}
          </PhotosContainer>
          <p className="name">
            {currentUser.firstName + " " + currentUser.lastName},{" "}
            <span>Age</span>
          </p>
        </Segment>
      </ProfileCard>
      <Link to="/profile/edit">
        <Button>Edit Profile</Button>
      </Link>
    </div>
  );
};

export default ProfileComponent;
