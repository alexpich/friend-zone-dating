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

  const [profile, setProfile] = useState([]);
  const [images, setImages] = useState([]);
  const [currentProfileShownId, setCurrentProfileShownId] = useState(null);

  const pass = (id, otherId) => {
    // post a Like value of 0 for pass
    LikesService.create(currentUser.id);
  };
  const like = () => {
    // post a Like value of 1 for like
  };

  // Get the nearby profiles
  useEffect(() => {
    // UserService.getTwentyUsersNearby()
    //   .then((res) => {
    //     setProfiles(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    UserService.getOneNearby()
      .then((res) => {
        setProfile(res.data);
        setImages(res.data[0].images[0].url);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Get the image of the first profile
  useEffect(() => {
    // // console.log("displaying the profiles...");
    if (profile.length) {
      console.log(profile);
      if (images.length) {
        console.log(images);
        //   console.log(images[0].url);
        //   console.log(`images here`);
      }
    }
    // console.log(images);

    // profiles.map((data) => {
    //   let userId = data.id;
    //   console.log(data.id);
    //   //   setCurrentProfileShownId();
    //   ImageService.get(data.id)
    //     .then((res) => {
    //       console.log(res);
    //       setImages(res.data[0].url);
    //       //   set
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // });
    // }, [profiles]);
  }, [profile, images]);

  return (
    <div>
      <PhotosContainer>
        {/* {imageOne ? <img src={imageOne} alt="Default" /> : ""}
        {imageTwo ? <img src={imageTwo} alt="Second" /> : ""}
        {imageThree ? <img src={imageThree} alt="Third" /> : ""} */}
        {/* map the user images */}
        {images ? <img src={images} alt="Default" /> : ""}
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
