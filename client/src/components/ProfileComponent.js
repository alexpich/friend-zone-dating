import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Segment } from "semantic-ui-react";

import ImageService from "../services/image.service";
import { UserContext } from "../context/UserContext";

// TODO: Change these photos from a grid pattern to a single picture that can be cycled through

const ProfileCard = styled.div`
  .name {
    text-transform: capitalize;
  }
`;

const PhotosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    object-fit: cover;
    width: 100%;
    height: 400px;
  }
`;

const ProfileComponent = () => {
  const { currentUser } = useContext(UserContext);

  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

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

  return (
    <div>
      <h1>ProfileComponent</h1>
      <ProfileCard>
        <Segment style={{ overflow: "auto", maxHeight: 600 }}>
          <PhotosContainer>
            {imageOne ? <img src={imageOne} alt="Default" /> : ""}
            {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
            {imageThree ? <img src={imageThree} alt="Third" /> : ""}
          </PhotosContainer>
          <p className="name">
            {currentUser.firstName},{" "}
            <span>{getAge(currentUser.birthdate)}</span>
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
