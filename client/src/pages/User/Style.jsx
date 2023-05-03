import { Link } from "react-router-dom";

import styled from "styled-components/macro";

// Sign up
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

const SelectionBlock = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  h1 {
    font-size: 18px;
    margin-bottom: 12px;
    padding: 10px;
    border-radius: 10px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  select {
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #4d4747;
    font-size: 16px;
    cursor: pointer;
  }

  select:last-of-type {
    margin-right: 10;
  }
`;

const Pair = styled.div`
  display: flex;
  padding: 8px 12px;
  /* background-color: #b0d7a1; */
  color: #4d4747;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;

  div {
    padding: 8px 12px;
    background-color: #b0d7a1;
    color: #4d4747;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const FormContent = styled.div`
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 20px;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const AvatarPreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const AvatarInput = styled.input`
  display: none;
`;
const FileInput = styled.input`
  margin-top: 10px;
`;

const Redirect = styled(Link)`
  margin-top: 10px;
  color: #7c9274;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: #4b8235;
    text-decoration: underline;
    cursor: pointer;
  }
`;

// Profile
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 30px;
`;
const Info = styled.div`
  /* width: 500px;
  height: 500px; */
  margin-bottom: 10px;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const ProfileInput = styled.input`
  padding: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 16px;
`;

const GenderSelect = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const GenderLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const GenderOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;

  input[type="radio"] {
    margin-right: 5px;
    cursor: pointer;
  }
`;

export {
  Wrapper,
  Form,
  Label,
  Input,
  Button,
  ErrorMessage,
  SelectionBlock,
  Pair,
  FormContent,
  RadioGroup,
  RadioLabel,
  CheckboxGroup,
  CheckboxLabel,
  AvatarUpload,
  AvatarPreview,
  AvatarInput,
  FileInput,
  Redirect,
  Container,
  Avatar,
  Info,
  Field,
  ProfileLabel,
  ProfileInput,
  Select,
  GenderSelect,
  GenderLabel,
  GenderOption,
  // Button,
};
