import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../../../../recoil/atoms";

import styled from "styled-components/macro";
import { ErrorMessage, Button } from "../../Style";

import LanguageWrapper from "../../LanguageWrapper";
import {
  languageOptions,
  getFilteredOptions,
} from "../../../../components/languageOptions.js";

import api from "../../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Reminder = styled.h1`
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 8px;
  font-size: 2em;
`;

const SelectionArea = styled.div`
  display: flex;
  width: 100%;
  height: 24vh;
  margin: 2% 0 2% 16%;
`;
const Row = styled.div`
  width: 100%;
`;

const Label = styled.div`
  padding: 8px;
  border-radius: 8px;
  font-size: 1.4em;
  margin-bottom: 8px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`;

const StepTwo = (props) => {
  const navigate = useNavigate();
  const { data, setData, handleBackClick, handleError, error } = props;
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const [speaking, setSpeaking] = useState([]);
  const [learning, setLearning] = useState([]);

  const handleSubmitClick = async () => {
    handleError("");
    setData((prev) => ({ ...prev, speaking, learning }));
    const userInput = { ...data, speaking, learning };
    try {
      const response = await api.signup(userInput);
      const { accessToken, user } = response.data;
      if (response.status === 200) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        navigate("/profile");
      }
    } catch (e) {
      handleError(e);
    }
  };

  const filteredOptions = getFilteredOptions(
    languageOptions,
    speaking,
    learning
  );

  return (
    <Wrapper>
      <Reminder>Please select at least a pair of language 🌱</Reminder>
      <SelectionArea>
        <Row>
          <Label>
            Speaking <span style={{ color: "red" }}>*</span>
          </Label>
          <LanguageWrapper
            type={"speaking"}
            state={speaking}
            setState={setSpeaking}
            filteredOptions={filteredOptions}
          />
        </Row>
        <Row>
          <Label>
            Learning <span style={{ color: "red" }}>*</span>
          </Label>
          <LanguageWrapper
            type={"learning"}
            state={learning}
            setState={setLearning}
            filteredOptions={filteredOptions}
          />
        </Row>
      </SelectionArea>
      <ErrorMessage>{error}</ErrorMessage>
      <ButtonArea>
        <Button value="back" onClick={handleBackClick}>
          Back
        </Button>
        <Button
          onClick={() => {
            if (speaking.length < 1 || learning.length < 1) return;
            handleSubmitClick();
          }}
          disabled={speaking.length < 1 || learning.length < 1}
        >
          Get started!
        </Button>
      </ButtonArea>
    </Wrapper>
  );
};

export default StepTwo;
