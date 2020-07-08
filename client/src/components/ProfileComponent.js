import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const ProfileCard = styled.div`
  border: 1px solid black;
  height: 50vh;
  .name {
    text-transform: capitalize;
  }
`;

const ProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <h1>ProfileComponent</h1>
      {/* <p>{JSON.stringify(currentUser)}</p> */}
      <ProfileCard>
        <p className="name">
          {currentUser.firstName + " " + currentUser.lastName}, <span>Age</span>
        </p>
      </ProfileCard>
      <Button>
        <Link to="/profile/edit">Edit Profile</Link>
        {/* <Link
          href={{
            pathname: "edit",
            query: { id: currentUser.id },
          }}
        >
          Edit Profile
        </Link> */}
      </Button>
    </div>
  );
};

export default ProfileComponent;
