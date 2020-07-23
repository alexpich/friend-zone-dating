import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../context/UserContext";
import UserService from "../services/user.service";
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

  const [profile, setProfile] = useState([]);
  const [images, setImages] = useState([]);

  const pass = (id, otherId) => {
    // post a Like value of 0 for pass
    LikesService.create(currentUser.id);
  };

  const like = () => {
    // post a Like value of 1 for like
    LikesService.create(currentUser.id);
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
    //       setImages(() => newRes[0].images[0].url);
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

        for (let i = 0; i < newRes[0].images.length; i++) {
          // setImages(() => newRes[0].images[i].url);
          setImages((images) => [...images, newRes[0].images[i].url]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Get the image of the first profile
  useEffect(() => {
    // // console.log("displaying the profiles...");
    // console.log(profile);
    if (profile.length) {
      console.log(profile);
      if (images.length) {
        console.log(images);
        // console.log(images[0]);
        // console.log(images[1]);
        // console.log(images[0].url);
      }
    }
  }, [profile, images]);

  return (
    <div>
      <PhotosContainer>
        {/* {imageOne ? <img src={imageOne} alt="Default" /> : ""}
        {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
        {imageThree ? <img src={imageThree} alt="Third" /> : ""} */}
        {/* map the user images */}
        {images ? <img src={images[0]} alt="Default" /> : ""}
        {images ? <img src={images[1]} alt="Second" /> : ""}
      </PhotosContainer>
      {profile.length ? (
        <p className="name">
          {profile[0].firstName}, <span>Age</span>
        </p>
      ) : (
        ""
      )}
      <button onClick={pass}>PASS</button>
      <button onClick={like}>LIKE</button>
      <p className="name">
        {/* {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span> */}
      </p>
    </div>
  );
};

export default Card;
