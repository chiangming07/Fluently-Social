// eslint-disable-next-line react-hooks/exhaustive-deps
import { useState, useEffect } from "react";

import styled from "styled-components/macro";
import {
  Title,
  Row,
  Label,
  Input,
  ErrorMessage,
  Button,
  Redirect,
} from "../../Style";

import signupImg from "./signupImg.png";

import api from "../../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Intro = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`;

const Image = styled.img`
  width: 60%;
  margin-right: 20px;
  opacity: 0.7;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const StepOne = (props) => {
  const { data, setData, handleNextClick, handleError, error } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setUsername(data?.username);
      setEmail(data?.email);
      setPassword(data?.password);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleNext = async () => {
    handleError("");
    if (!username || !email || !password) {
      return;
    }
    const data = { username, email, password, step: "first" };
    try {
      const response = await api.signup(data);
      if (response.data) {
        setData({ username, email, password });
        handleNextClick();
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Wrapper>
      <Intro>
        <Image src={signupImg} />
      </Intro>
      <Info>
        <Title>Join Now 🌱</Title>
        <Row>
          <Label>
            Username <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="text"
            value={username}
            placeholder="Username (2-14 characters)"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </Row>
        <Row>
          <Label>
            Email <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="email"
            value={email}
            placeholder="Email (e.g., example@example.com)"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </Row>
        <Row>
          <Label>
            Password <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            type="password"
            value={password}
            placeholder="Password (at least 8 characters)"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </Row>

        <ErrorMessage>{error}</ErrorMessage>
        <Button
          onClick={() => handleNext()}
          disabled={!username || !email || !password}
        >
          Next
        </Button>
        <Redirect to="/login">Already a member?</Redirect>
      </Info>
    </Wrapper>
  );
};

export default StepOne;
