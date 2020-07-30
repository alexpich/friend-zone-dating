import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";

import { UserContext } from "../context/UserContext";
import UserService from "../services/user.service";
import LikesService from "../services/likes.service";

import Slider from "../components/Slider";

const PhotosContainer = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    min-height: 400px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = (props) => {
  const { currentUser } = useContext(UserContext);

  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);

  const setNextProfile = () => {
    let newProfilesArr = [...profiles];
    newProfilesArr.splice(0, 1);

    setProfiles(newProfilesArr);
    setProfile(newProfilesArr[0]);
  };

  const pass = () => {
    // post a Like value of 0 for pass, set a state and rerender
    LikesService.create(profile.id, 0, currentUser.id);

    setNextProfile();
  };

  const like = () => {
    // post a Like value of 1 for like, set a state and rerender
    LikesService.create(profile.id, 1, currentUser.id);

    setNextProfile();
  };

  const superLike = () => {
    // post a Like value of 1 for like, set a state and rerender
    LikesService.create(profile.id, 2, currentUser.id);

    setNextProfile();
  };

  // Gets the nearby profiles
  useEffect(() => {
    UserService.getTwentyUsersNearby(currentUser.id)
      .then((res) => {
        let nearbyUsers = res.data;
        setProfiles(nearbyUsers);
        setProfile(nearbyUsers[0]);

        // Get and set the images of the first profile
        let imgArr = [];
        if (nearbyUsers[0]) {
          for (let i = 0; i < nearbyUsers[0].images.length; i++) {
            imgArr.push(nearbyUsers[0].images[i].url);
          }
          setImages(imgArr);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Updates the images on swipe
  useEffect(() => {
    if (profiles.length) {
      if (profile) {
        let imgArr = [];
        for (let i = 0; i < profile.images.length; i++) {
          imgArr.push(profile.images[i].url);
        }
        setImages(imgArr);
      }
    }
  }, [profiles, profile]);

  return (
    <>
      <div>
        <PhotosContainer>
          {profile ? (
            <Slider images={images} />
          ) : (
            "There are no nearby users. Please check back again soon :)"
          )}
        </PhotosContainer>
      </div>
      {/* {profiles.length ? ( */}
      {profile ? (
        <>
          <h2 className="name">
            {/* {profiles[0].firstName}, <span>Age</span> */}
            {profile.firstName}, <span>Age</span>
          </h2>
          {/* <p>{profile[0].about}</p> */}
        </>
      ) : (
        ""
      )}
      <ButtonContainer>
        <Button onClick={pass} color="red" inverted icon="x" />
        <Button onClick={like} color="green" inverted icon="heart" />
        <Button onClick={superLike} color="blue" inverted icon="star" />
      </ButtonContainer>
    </>
  );
};

export default Card;
