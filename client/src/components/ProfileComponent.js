import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const ProfileComponent = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const userFromSession = AuthService.getCurrentUser();

  return (
    <div>
      <h1>ProfileComponent</h1>
      <p>{JSON.stringify(currentUser)}</p>
    </div>
  );
};

export default ProfileComponent;
