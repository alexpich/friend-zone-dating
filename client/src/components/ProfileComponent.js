import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const ProfileCard = styled.div`
  border: 1px solid black;
`;

const ProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <h1>ProfileComponent</h1>
      {/* <p>{JSON.stringify(currentUser)}</p> */}
      <ProfileCard>
        <p>
          {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span>
        </p>
      </ProfileCard>
    </div>
  );
};

export default ProfileComponent;
