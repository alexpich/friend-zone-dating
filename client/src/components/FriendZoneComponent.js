import React, { useState, useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";

import Card from "./Card";

import { UserContext } from "../context/UserContext";
import UserService from "../services/user.service";

const FriendZoneComponent = (props) => {
  const { currentUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const initialState = {
    latitude: null,
    longitude: null,
  };

  const [userLocation, setUserLocation] = useState(initialState);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let data = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };

    UserService.update(currentUser.id, data)
      .then((res) => {
        // console.log(res);
        console.log("Updating location...");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userLocation, currentUser.id]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <p>Current latitude: {userLocation.latitude}</p>
          <p>Current longitude: {userLocation.longitude}</p>
        </>
      )}
      <Segment style={{ overflow: "auto", maxHeight: 600 }}>
        <Card />
      </Segment>
    </div>
  );
};

export default FriendZoneComponent;
