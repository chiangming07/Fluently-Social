import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";

import Topic from "./Topic";

import api from "../../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 79vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 20%;
  text-align: left;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 24px;
  font-size: 16px;
  width: 32%;

  option {
    background-color: #fff;
    color: #333;
    font-size: 16px;
  }
`;

const Button = styled.span`
  margin: 0 10px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#b0d7a1")};
  color: ${({ disabled }) => (disabled ? "#9b9b9b" : "#4d4747")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#628566")};
    color: ${({ disabled }) => (disabled ? "#9b9b9b" : "white")};
  }
`;
const Pair = styled.div`
  display: flex;
  color: #4d4747;
  border-radius: 5px;
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

const MyPreference = (props) => {
  const {
    speaking,
    setSpeaking,
    learning,
    setLearning,
    selectedTopic,
    setSelectedTopic,
  } = props;
  // const [speaking, setSpeaking] = useState([]);
  const [selectedSpeaking, setSelectedSpeaking] = useState("");
  const [selectedSpeakingLevel, setSelectedSpeakingLevel] = useState("");
  // const [learning, setLearning] = useState([]);
  const [selectedLearning, setSelectedLearning] = useState("");
  const [selectedLearningLevel, setSelectedLearningLevel] = useState("");
  // const [selectedTopic, setSelectedTopic] = useState([]);

  const successNotify = (msg) => {
    toast.success(msg, {
      icon: "🌱",
    });
  };
  const errorNotify = (msg) => {
    toast.error(msg);
  };

  const handleAddLanguage = (type) => {
    let newLanguage, newLevel, newItems;

    if (type === "speaking") {
      newLanguage = selectedSpeaking;
      newLevel = selectedSpeakingLevel;
      newItems = [...speaking, { language: newLanguage, level: newLevel }];
      setSelectedSpeaking("");
      setSelectedSpeakingLevel("");
      setSpeaking(newItems);
    } else {
      newLanguage = selectedLearning;
      newLevel = selectedLearningLevel;
      newItems = [...learning, { language: newLanguage, level: newLevel }];
      setSelectedLearning("");
      setSelectedLearningLevel("");
      setLearning(newItems);
    }
  };

  const handleSubmitClick = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;
    const topic = selectedTopic;
    const updated = { email, speaking, learning, topic };
    console.log(updated);
    try {
      const response = await api.updatePreference(updated, accessToken);
      console.log(response);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      if (response.status === 200) {
        successNotify("Preference updated!");
      }
    } catch (e) {
      console.log(e);
      errorNotify("Before updating, you must re-select all preferences.");
    }
  };
  return (
    <Wrapper>
      <ToastContainer />
      <Content>
        <Row>
          <Label>Speaking</Label>
          <SelectWrapper>
            <Select
              value={selectedSpeaking}
              onChange={(e) => setSelectedSpeaking(e.target.value)}
            >
              <option value="" disabled>
                Language
              </option>
              <option value="zh-TW">Chinese</option>
              <option value="en-US">English</option>
              <option value="ES">Spanish</option>
              <option value="JP">Japanese</option>
            </Select>
            <Select
              value={selectedSpeakingLevel}
              onChange={(e) => setSelectedSpeakingLevel(e.target.value)}
            >
              <option value="" disabled>
                Level
              </option>
              <option value="advanced">Advanced</option>
              <option value="native">Native</option>
            </Select>
            <Button
              onClick={() => {
                if (
                  !selectedSpeaking ||
                  !selectedSpeakingLevel ||
                  speaking.length > 2
                )
                  return;
                handleAddLanguage("speaking");
              }}
              disabled={
                !selectedSpeaking ||
                !selectedSpeakingLevel ||
                speaking.length > 2
              }
            >
              Add
            </Button>
          </SelectWrapper>
        </Row>
        <Pair>
          {speaking.map((item, index) => (
            <div key={index}>
              <span>{item.language} - </span>
              <span>{item.level}</span>
            </div>
          ))}
        </Pair>
        <Row>
          <Label>Learning</Label>
          <SelectWrapper>
            <Select
              value={selectedLearning}
              onChange={(e) => setSelectedLearning(e.target.value)}
            >
              <option value="" disabled>
                Language
              </option>
              <option value="zh-TW">Chinese</option>
              <option value="en-US">English</option>
              <option value="ES">Spanish</option>
              <option value="JP">Japanese</option>
            </Select>
            <Select
              value={selectedLearningLevel}
              onChange={(e) => setSelectedLearningLevel(e.target.value)}
            >
              <option value="" disabled>
                Level
              </option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
            <Button
              onClick={() => {
                if (
                  !selectedLearning ||
                  !selectedLearningLevel ||
                  learning.length > 2
                )
                  return;
                handleAddLanguage("learning");
              }}
              disabled={
                !selectedLearning ||
                !selectedLearningLevel ||
                learning.length > 2
              }
            >
              Add
            </Button>
          </SelectWrapper>
        </Row>
        <Pair>
          {learning.map((item, index) => (
            <div key={index}>
              <span>{item.language} - </span>
              <span>{item.level}</span>
            </div>
          ))}
        </Pair>
        <Row>
          <Label>Topic</Label>
          <Topic
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        </Row>
        <Button onClick={() => handleSubmitClick()}>Update</Button>
      </Content>
    </Wrapper>
  );
};

export default MyPreference;
