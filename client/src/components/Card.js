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

  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [images, setImages] = useState([]);

  const pass = () => {
    // post a Like value of 0 for pass, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profiles[0].id);
    console.log("Passed!");
    LikesService.create(profiles[0].id, 0, currentUser.id);

    let newProfilesArr = [...profiles];
    newProfilesArr.splice(0, 1);
    setProfiles(newProfilesArr);
  };

  const like = () => {
    // post a Like value of 1 for like, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profiles[0].id);
    console.log("Liked!");
    LikesService.create(profiles[0].id, 1, currentUser.id);

    let newProfilesArr = [...profiles];
    newProfilesArr.splice(0, 1);
    setProfiles(newProfilesArr);
  };

  const superLike = () => {
    // post a Like value of 1 for like, set a state and rerender
    console.log("cuid:" + currentUser.id);
    console.log("ouid:" + profiles[0].id);
    console.log("Superliked!");
    LikesService.create(profiles[0].id, 2, currentUser.id);

    let newProfilesArr = [...profiles];
    newProfilesArr.splice(0, 1);
    setProfiles(newProfilesArr);
  };

  // TODO: get 20 profiles nearby, save it into a state(array) and then whenever passed/liked then pop it off the array

  // Get the nearby profiles
  useEffect(() => {
    // UserService.getOneNearby()
    //   .then((res) => {
    //     let newRes = res.data.filter(
    //       (profiles) => profiles.id !== currentUser.id
    //     );
    //     setProfiles(newRes);

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
        // Filter and remove the current user
        let nearbyUsers = res.data.filter((p) => p.id !== currentUser.id);
        setProfiles(nearbyUsers);

        // Get all the Liked/Passed users from the currentUser
        LikesService.getAllFromUser(currentUser.id)
          .then((res) => {
            // For each user that is liked, remove it from the state(array)
            let response = res.data;
            setLikedUsers(response);

            // let temp = profiles;
            // for (let i = 0; i < likedUsers.length; i++) {
            //   for (let j = 0; j < profiles.length; j++) {
            //     if (likedUsers[i].otherUserId === profiles[j].id) {
            //       // Remove the profile if currentUser has already seen this person
            //       temp.splice(profiles[j], 1);
            //     }
            //   }
            // }
            // console.log(temp);
            // setProfiles(temp);
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
      // console.log(profiles);

      //  This is causing an infinite loop for some reason
      if (likedUsers.length) {
        // console.log(likedUsers);
        // console.log(likedUsers[0].otherUserId);
        let temp = profiles;
        for (let i = 0; i < likedUsers.length; i++) {
          for (let j = 0; j < profiles.length; j++) {
            if (likedUsers[i].otherUserId === profiles[j].id) {
              // Remove the profile if currentUser has already seen this person
              temp.splice(profiles[j], 1);
            }
          }
        }
        // console.log(temp);
        setProfiles(temp);
        setProfile(temp[0]);
        if (images.length) {
          let imgArr = [];
          for (let i = 0; i < profiles[0].images.length; i++) {
            imgArr.push(profiles[0].images[i].url);
          }
          setImages(imgArr);
        }
        console.log(temp[0]);
      }
    }
  }, [profiles, likedUsers, profile]);

  useEffect(() => {
    // if (images.length) {
    //   let imgArr = [];
    //   for (let i = 0; i < profiles[0].images.length; i++) {
    //     imgArr.push(profiles[0].images[i].url);
    //   }
    //   setImages(imgArr);
    // }
  }, [images, profiles]);

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
        <Button onClick={pass} icon="x" />
        <Button onClick={like} icon="heart" />
        <Button onClick={superLike} icon="star" />
      </ButtonContainer>
    </>
  );
};

export default Card;
