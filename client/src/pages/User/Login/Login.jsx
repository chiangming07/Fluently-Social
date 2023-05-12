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
  Redirect,
} from "../Style";

import api from "../../../utils/api";

const UserData = styled.div`
  width: 40%;
`;
const Button = styled.span`
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#b0d7a1")};
  color: ${({ disabled }) => (disabled ? "#9b9b9b" : "#4d4747")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#628566")};
    color: ${({ disabled }) => (disabled ? "#9b9b9b" : "white")};
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleError = (e) => {
    if (e.response) {
      setError(e.response.data.message);
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
              />
            </Row>
            <Row>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    </Wrapper>
  );
};

export default Login;
