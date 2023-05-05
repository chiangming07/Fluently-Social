import React from "react";
import styled from "styled-components";

import notFound from "./notFound.png";

const Wrapper = styled.div`
  height: 100vh;
  background-size: 50px 50px;
  background-image: linear-gradient(to right, #e9e6e68f 0.5px, transparent 2px),
    linear-gradient(to bottom, #e9e6e68f 0.5px, transparent 2px);
  overflow: hidden;
  padding: 150px 60px;
`;

const Title = styled.h2`
  font-family: "Cabin Sketch", cursive;
  font-size: 3em;
  text-align: center;
  opacity: 0.8;
  margin-bottom: 5%;
`;

const Image = styled.img`
  display: block;
  width: 30%;
  margin: 0 auto;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Title>404 NOT FOUND!</Title>
      <Image src={notFound} />
    </Wrapper>
  );
};

export default NotFound;
