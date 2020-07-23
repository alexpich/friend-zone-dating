import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button, Grid, Segment, Container } from "semantic-ui-react";

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
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [profile, setProfile] = useState([]);
  const [images, setImages] = useState([]);

  const pass = () => {
    // post a Like value of 0 for pass
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profile[0].id);
    // LikesService.create(currentUser.id, profile[0].id, 0);
    LikesService.create(profile[0].id, 0, currentUser.id);
  };

  const like = () => {
    // post a Like value of 1 for like
    LikesService.create(profile[0].id, 1, currentUser.id);
  };

  const superLike = () => {
    // post a Like value of 1 for like
    LikesService.create(profile[0].id, 2, currentUser.id);
  };

  // TODO: get 20 profiles nearby, save it into a state(array) and then whenever passed/liked then pop it off the array

  // Get the nearby profiles
  useEffect(() => {
    // UserService.getOneNearby()
    //   .then((res) => {
    //     let newRes = res.data.filter(
    //       (profile) => profile.id !== currentUser.id
    //     );
    //     setProfile(newRes);

    //     for (let i = 0; i < newRes[0].images.length; i++) {
    //       // setImages(() => newRes[0].images[i].url);
    //       setImages((images) => [...images, newRes[0].images[i].url]);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    UserService.getTwentyUsersNearby()
      .then((res) => {
        let newRes = res.data.filter(
          (profile) => profile.id !== currentUser.id
        );
        setProfile(newRes);

        let imgArr = [];

        for (let i = 0; i < newRes[0].images.length; i++) {
          // setImages(() => newRes[0].images[i].url);
          // setImages((images) => [...images, newRes[0].images[i].url]);
          imgArr.push(newRes[0].images[i].url);
        }
        setImages(imgArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Get the images of the first profile
  useEffect(() => {
    if (profile.length) {
      console.log(profile);
      if (images.length) {
        console.log(images);
      }
    }
  }, [profile, images]);

  return (
    <>
      <div>
        <PhotosContainer>
          <Slider images={images} />
        </PhotosContainer>
      </div>
      {profile.length ? (
        <>
          <h2 className="name">
            {profile[0].firstName}, <span>Age</span>
          </h2>
          {/* <p>{profile[0].about}</p> */}
        </>
      ) : (
        ""
      )}
      <ButtonContainer>
        <Button onClick={pass} icon="x" />
        <Button onClick={like} icon="heart" />
        <Button onClick={superLike} icon="star" />
      </ButtonContainer>
    </>
  );
};

export default Card;
