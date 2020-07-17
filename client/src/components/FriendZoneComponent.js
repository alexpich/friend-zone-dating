import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";

const FriendZoneComponent = () => {
  // const initialState = {};

  // const [users, setUsers] = useState(initialState);

  // useEffect(() => {

  // }, [])

  return (
    <div>
      <Segment style={{ overflow: "auto", maxHeight: 600 }}>
        <p>get users from the database and display them here</p>
      </Segment>
    </div>
  );
};

export default FriendZoneComponent;
