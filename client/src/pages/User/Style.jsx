import { Link } from "react-router-dom";

import styled from "styled-components/macro";

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
  width: 80%;
  height: 65vh;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2em;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 1em;
  text-align: center;
  &:hover {
    background-color: #dcb63064;
    border-radius: 16px;
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🌱</text></svg>")
        16 0,
      auto;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 0.5em 0 1.2em 0;
  border: none;
  background-color: #f5f5f5;
  outline-color: rgb(99, 137, 95);
  border-radius: 4px;
  font-size: 1em;
`;

const Button = styled.span`
  margin: 0 12px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ disabled }) =>
    disabled ? "#e0e9e9" : "rgb(214, 236, 221)"};
  color: ${({ disabled }) => (disabled ? "#9b9b9b" : "#4d4747")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#e0e9e9" : "rgb(99, 137, 95)"};
    color: ${({ disabled }) => (disabled ? "#9b9b9b" : "white")};
  }
`;

const ErrorMessage = styled.div`
  height: 2em;
  margin: 0.4em 0;
  color: #df1b1b;
`;

const Redirect = styled(Link)`
  margin-top: 10px;
  color: #7c9274;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    color: #4b8235;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export {
  Wrapper,
  Form,
  Title,
  Row,
  Label,
  Input,
  Button,
  ErrorMessage,
  Redirect,
};
