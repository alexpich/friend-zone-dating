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
  const [likedUsers, setLikedUsers] = useState([]);
  const [images, setImages] = useState([]);

  const setNextProfile = () => {
    let newProfilesArr = [...profiles];
    newProfilesArr.splice(0, 1);
    setProfiles(newProfilesArr);
    setProfile(newProfilesArr[0]);

    console.log(profile);
    let imgArr = [];
    if (profile) {
      for (let i = 0; i < profile.images.length; i++) {
        imgArr.push(profile.images[i].url);
      }
    }
    setImages(imgArr);
  };

  const pass = () => {
    // post a Like value of 0 for pass, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profile.id);
    console.log("Passed!");
    LikesService.create(profile.id, 0, currentUser.id);

    setNextProfile();
  };

  const like = () => {
    // post a Like value of 1 for like, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profile.id);
    console.log("Liked!");
    LikesService.create(profile.id, 1, currentUser.id);

    setNextProfile();
  };

  const superLike = () => {
    // post a Like value of 1 for like, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profile.id);
    console.log("Superliked!");
    LikesService.create(profile.id, 2, currentUser.id);

    setNextProfile();
  };

  // TODO: get 20 profiles nearby, save it into a state(array) and then whenever passed/liked then pop it off the array

  // Get the nearby profiles
  useEffect(() => {
    UserService.getTwentyUsersNearby(currentUser.id)
      .then((res) => {
        let nearbyUsers = res.data;
        setProfiles(nearbyUsers);
        setProfile(nearbyUsers[0]);

        // Get all the Liked/Passed users from the currentUser
        LikesService.getAllFromUser(currentUser.id)
          .then((res) => {
            // For each user that is liked, remove it from the state(array)
            let response = res.data;
            setLikedUsers(response);
          })
          .catch((e) => {
            console.log(e);
          });

        // Get and set the images of the first profile
        let imgArr = [];
        for (let i = 0; i < nearbyUsers[0].images.length; i++) {
          imgArr.push(nearbyUsers[0].images[i].url);
        }
        setImages(imgArr);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Get the liked users and then remove those from the profiles to be shown
  useEffect(() => {
    if (profiles.length) {
      // console.log(currentUser);
      console.log(profiles);

      //  This is causing an infinite loop for some reason
      // if (likedUsers.length) {
      //   let temp = profiles;
      //   for (let i = 0; i < likedUsers.length; i++) {
      //     for (let j = 0; j < profiles.length; j++) {
      //       if (likedUsers[i].otherUserId === profiles[j].id) {
      //         // Remove the profile if currentUser has already seen this person
      //         temp.splice(profiles[j], 1);
      //       }
      //     }
      //   }
      //   setProfiles(temp);
      //   setProfile(temp[0]);
      // if (images.length) {
      // let imgArr = [];
      // if (profile) {
      //   for (let i = 0; i < profile.images.length; i++) {
      //     imgArr.push(profile.images[i].url);
      //   }
      // }
      // setImages(imgArr);
      // }
      // }
    }
  }, [profiles, likedUsers, profile]);

  useEffect(() => {
    // let imgArr = [];
    // if (profile) {
    //   for (let i = 0; i < profile.images.length; i++) {
    //     imgArr.push(profile.images[i].url);
    //   }
    // }
    // setImages(imgArr);
    // setNextProfile();
  }, []);

  return (
    <>
      <div>
        <PhotosContainer>
          <Slider images={images} />
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
