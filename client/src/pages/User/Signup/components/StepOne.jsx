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
  width: 80%;
  margin-right: 20px;
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
    if (data) {
      setUsername(data?.username);
      setEmail(data?.email);
      setPassword(data?.password);
    }
  }, []);

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
        <Image src="https://media.istockphoto.com/id/1197121742/zh/%E7%85%A7%E7%89%87/%E9%BB%83%E8%89%B2%E7%9A%84%E5%BF%AB%E6%A8%82%E5%B8%8C%E5%B7%B4%E7%8B%97%E7%B4%85%E9%A0%AD%E9%AB%AE%E7%9A%84%E6%97%A5%E6%9C%AC%E7%8B%97%E5%BE%AE%E7%AC%91%E8%82%96%E5%83%8F.jpg?s=612x612&w=0&k=20&c=ewvHfNLFOiqiLgXE5I1x0vpfje-VW-pSei6NgvHHlr4=" />
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
