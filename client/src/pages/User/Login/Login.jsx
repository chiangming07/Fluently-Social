import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "../../../recoil/atoms";

import styled from "styled-components/macro";

import { Redirect } from "../Style";

import api from "../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 70%;
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;
const Input = styled.input`
  width: 40%;
  padding: 10px;
  margin: 15px 0;
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;
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

const ErrorMessage = styled.p`
  padding: 10px;
  border-radius: 5px;
  /* background: #91d37769; */
  color: #df1b1b;
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
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
      <Form>
        <>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
