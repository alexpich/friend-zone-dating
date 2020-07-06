import React from "react";
import styled from "styled-components";
import HomeBg from "../assets/home-bg.jpg";

const HomeStyles = styled.div`
  background-image: url(${HomeBg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const HomeComponent = () => {
  return (
    <HomeStyles>
      <div className="container">
        <button>Sign Up</button>
      </div>
    </HomeStyles>
  );
};

export default HomeComponent;
