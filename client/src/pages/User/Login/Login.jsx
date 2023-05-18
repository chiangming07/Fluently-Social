import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../../../recoil/atoms";

import styled from "styled-components/macro";
import {
  Wrapper,
  Form,
  Title,
  Row,
  Label,
  Input,
  ErrorMessage,
  Button,
  Redirect,
} from "../Style";

import loginImg from "./loginImg.png";

import api from "../../../utils/api";

const UserData = styled.div`
  width: 40%;
`;

const Image = styled.img`
  position: absolute;
  bottom: 0;
  right: 40px;
  width: 28%;
  opacity: 0.7;
`;

const Login = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("admin@fluently.com");
  const [password, setPassword] = useState("admin123");

  const handleError = (e) => {
    if (e.response) {
      setError(e.response.data.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmitClick();
    }
  };

  const handleSubmitClick = async () => {
    handleError("");
    try {
      const data = { email, password };
      const response = await api.login(data);

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        navigate("/profile");
      }
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <Wrapper>
      <Form style={{ width: "50%" }}>
        <>
          <Title>Welcome Back 🌱</Title>
          <UserData>
            <Row>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </Row>
            <Row>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </Row>
          </UserData>
          <ErrorMessage>{error}</ErrorMessage>
          <Button onClick={handleSubmitClick} disabled={!email || !password}>
            Submit
          </Button>
          <Redirect to="/signup">Don't have an account?</Redirect>
        </>
      </Form>
      <Image src={loginImg} />
    </Wrapper>
  );
};

export default Login;
