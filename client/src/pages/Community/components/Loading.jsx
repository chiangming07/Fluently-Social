import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 12% auto;
`;

const LoadingTitle = styled.h2`
  color: #63895f;
  margin: 0;
  font: 2em verdana;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LoadingDots = styled.div`
  display: inline-block;
`;

const Dot = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0.5em;
  border-radius: 50%;
  animation: ${loadingAnimation} 1s infinite alternate;

  &:nth-of-type(1) {
    background: #008fb2;
    animation-delay: 0s;
  }

  &:nth-of-type(2) {
    background: #009b9e;
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    background: #00a77d;
    animation-delay: 0.4s;
  }

  &:nth-of-type(4) {
    background: #00b247;
    animation-delay: 0.6s;
  }

  &:nth-of-type(5) {
    background: #5ab027;
    animation-delay: 0.8s;
  }

  &:nth-of-type(6) {
    background: #a0b61e;
    animation-delay: 1s;
  }

  &:nth-of-type(7) {
    background: #87a284;
    animation-delay: 1.2s;
  }
`;

const Loading = ({ msg }) => {
  return (
    <LoadingContainer>
      <LoadingTitle>{msg}</LoadingTitle>
      <LoadingDots className="loading">
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </LoadingDots>
    </LoadingContainer>
  );
};

export default Loading;
