import React, { useState, useEffect, useContext } from "react";
import { Segment, Button } from "semantic-ui-react";
import { geolocated } from "react-geolocated";

import { UserContext } from "../context/UserContext";
import UserService from "../services/user.service";

const FriendZoneComponent = (props) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const initialState = {
    latitude: null,
    longitude: null,
  };

  const [userLocation, setUserLocation] = useState(initialState);

  // console.log(userLocation);
  useEffect(() => {
    if (props.coords) {
      setUserLocation({
        latitude: props.coords.latitude,
        longitude: props.coords.longitude,
      });
    }

    let data = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };
    console.log(data);

    UserService.update(currentUser.id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      {!props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : props.coords ? (
        <table>
          <tbody>
            <tr>
              <td>latitude</td>
              <td>{props.coords.latitude}</td>
            </tr>
            <tr>
              <td>longitude</td>
              <td>{props.coords.longitude}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
      <Segment style={{ overflow: "auto", maxHeight: 600 }}>
        <p>get users from the database and display them here</p>
      </Segment>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
})(FriendZoneComponent);
