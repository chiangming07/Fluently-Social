import { useState } from "react";
import { toast } from "react-toastify";

import styled from "styled-components/macro";

import Topic from "./Topic";
import LanguageFlag from "../../../../components/LanguageFlag/LanguageFlag";
import languageOptions from "../../../../components/languageOptions.js";
import remove from "./remove.svg";

import api from "../../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 79vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  padding: 2.5%;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 30%;
  padding-right: 2%;
`;

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;
const SelectWrapper = styled.div`
  display: flex;
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

const PairWrapper = styled.div`
  display: flex;
  margin-top: 2%;
`;

const Pair = styled.div`
  position: relative;
  padding: 8px 12px;
  background-color: rgb(214, 236, 221);
  color: #4d4747;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const Remove = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

const Button = styled.span`
  margin: 0 10px;
  padding: 8px;
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

const MyPreference = (props) => {
  const {
    speaking,
    setSpeaking,
    learning,
    setLearning,
    selectedTopic,
    setSelectedTopic,
  } = props;
  const [selectedSpeaking, setSelectedSpeaking] = useState("");
  const [selectedSpeakingLevel, setSelectedSpeakingLevel] = useState("");
  const [selectedLearning, setSelectedLearning] = useState("");
  const [selectedLearningLevel, setSelectedLearningLevel] = useState("");

  const successNotify = (msg) => {
    toast.success(msg, {
      style: {
        top: "100px",
      },
      icon: "🌱",
    });
  };
  const errorNotify = (msg) => {
    toast.error(msg, {
      style: {
        top: "100px",
      },
    });
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

  const handleRemoveLanguage = (index, type) => {
    if (type === "speaking") {
      const updatedSpeaking = [...speaking];
      updatedSpeaking.splice(index, 1);
      setSpeaking(updatedSpeaking);
    } else {
      const updatedLearning = [...learning];
      updatedLearning.splice(index, 1);
      setLearning(updatedLearning);
    }
  };

  const handleSubmitClick = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const _id = user.id;
    const topic = selectedTopic;
    const updated = { _id, speaking, learning, topic };
    if (topic.length > 5) {
      errorNotify("Maximum of 5 topics can be selected.");
      return;
    }
    try {
      const response = await api.updatePreference(updated, accessToken);
      if (response.status === 200) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        successNotify("Preference updated!");
      }
    } catch (e) {
      console.log(e);
      errorNotify("Before updating, you must re-select all preferences.");
    }
  };
  return (
    <Wrapper>
      <Content>
        <Row>
          <Label>
            Speaking <span style={{ color: "red" }}>*</span>
          </Label>
          <LanguageWrapper>
            <SelectWrapper>
              <Select
                value={selectedSpeaking}
                onChange={(e) => setSelectedSpeaking(e.target.value)}
              >
                {languageOptions.map((option) => {
                  const isSpeakingLanguage = speaking.some(
                    (item) => item.language === option.value
                  );
                  const isLearningLanguage = learning.some(
                    (item) => item.language === option.value
                  );
                  const isDisabled = isSpeakingLanguage || isLearningLanguage;

                  return (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={isDisabled}
                    >
                      {option.label}
                    </option>
                  );
                })}
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
                    speaking.length >= 3
                  )
                    return;
                  handleAddLanguage("speaking");
                }}
                disabled={
                  !selectedSpeaking ||
                  !selectedSpeakingLevel ||
                  speaking.length >= 3
                }
              >
                Add
              </Button>
            </SelectWrapper>
            <PairWrapper>
              {speaking.map((item, index) => (
                <Pair key={index}>
                  <LanguageFlag language={item.language} />
                  <span>{item.level}</span>
                  <Remove
                    src={remove}
                    onClick={() => {
                      if (speaking.length <= 1) return;
                      handleRemoveLanguage(index, "speaking");
                    }}
                    disabled={speaking.length <= 1}
                  />
                </Pair>
              ))}
            </PairWrapper>
          </LanguageWrapper>
        </Row>
        <Row>
          <Label>
            Learning <span style={{ color: "red" }}>*</span>
          </Label>
          <LanguageWrapper>
            <SelectWrapper>
              <Select
                value={selectedLearning}
                onChange={(e) => setSelectedLearning(e.target.value)}
              >
                {languageOptions.map((option) => {
                  const isSpeakingLanguage = speaking.some(
                    (item) => item.language === option.value
                  );
                  const isLearningLanguage = learning.some(
                    (item) => item.language === option.value
                  );
                  const isDisabled = isSpeakingLanguage || isLearningLanguage;

                  return (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={isDisabled}
                    >
                      {option.label}
                    </option>
                  );
                })}
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
                    learning.length >= 3
                  )
                    return;
                  handleAddLanguage("learning");
                }}
                disabled={
                  !selectedLearning ||
                  !selectedLearningLevel ||
                  learning.length >= 3
                }
              >
                Add
              </Button>
            </SelectWrapper>
            <PairWrapper>
              {learning.map((item, index) => (
                <Pair key={index}>
                  <LanguageFlag language={item.language} />
                  <span>{item.level}</span>
                  <Remove
                    src={remove}
                    onClick={() => {
                      if (learning.length <= 1) return;
                      handleRemoveLanguage("learning");
                    }}
                    disabled={learning.length <= 1}
                  />
                </Pair>
              ))}
            </PairWrapper>
          </LanguageWrapper>
        </Row>

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
