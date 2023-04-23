import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Button, SelectionBlock, Pair } from "../../Style";

import api from "../../../../utils/api";

const StepTwo = (props) => {
  const navigate = useNavigate();
  const {
    data,
    setData,
    handleLastClick,
    handleNextClick,
    handleError,
    error,
  } = props;

  const [speaking, setSpeaking] = useState([]);
  const [selectedSpeaking, setSelectedSpeaking] = useState("");
  const [selectedSpeakingLevel, setSelectedSpeakingLevel] = useState("");
  const [learning, setLearning] = useState([]);
  const [selectedLearning, setSelectedLearning] = useState("");
  const [selectedLearningLevel, setSelectedLearningLevel] = useState("");

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

  const handleNext = () => {
    if (speaking.length < 1 || learning.length < 1) {
      handleError("Please select at least a pair of language");
    } else {
      handleError("");
      setData({ ...data, speaking, learning });
      handleNextClick("next-2");
    }
  };

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
        navigate("/");
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <>
      <SelectionBlock>
        <h1 style={{ background: "#91d37769" }}>
          Please select at least a pair of language
        </h1>
        <div>
          <h2>What languages do you speak?</h2>
          <select
            value={selectedSpeaking}
            onChange={(e) => setSelectedSpeaking(e.target.value)}
          >
            <option value="" disabled>
              I speak...
            </option>
            <option value="zh-TW">Chinese</option>
            <option value="en-US">English</option>
            <option value="ES">Spanish</option>
            <option value="JP">Japanese</option>
          </select>
          <select
            value={selectedSpeakingLevel}
            onChange={(e) => setSelectedSpeakingLevel(e.target.value)}
          >
            <option value="" disabled>
              My level is...
            </option>
            <option value="advanced">Advanced</option>
            <option value="native">Native</option>
          </select>
          <Button
            onClick={() => {
              if (!selectedSpeaking || !selectedSpeakingLevel) return;
              handleAddLanguage("speaking");
            }}
            disabled={!selectedSpeaking || !selectedSpeakingLevel}
          >
            Add
          </Button>
          <Pair>
            {speaking.map((item) => (
              <div key={item.language}>
                <span>{item.language} - </span>
                <span>{item.level}</span>
              </div>
            ))}
          </Pair>
        </div>
        <div>
          <h2>What languages do you want to learn?</h2>
          <select
            value={selectedLearning}
            onChange={(e) => setSelectedLearning(e.target.value)}
          >
            <option value="" disabled>
              I wanna learn...
            </option>
            <option value="zh-TW">Chinese</option>
            <option value="en-US">English</option>
            <option value="ES">Spanish</option>
            <option value="JP">Japanese</option>
          </select>
          <select
            value={selectedLearningLevel}
            onChange={(e) => setSelectedLearningLevel(e.target.value)}
          >
            <option value="" disabled>
              My level is...
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <Button
            onClick={() => {
              if (!selectedLearning || !selectedLearningLevel) return;
              handleAddLanguage("learning");
            }}
            disabled={!selectedLearning || !selectedLearningLevel}
          >
            Add
          </Button>
          <Pair>
            {learning.map((item) => (
              <div key={item.language}>
                <span>{item.language} - </span>
                <span>{item.level}</span>
              </div>
            ))}
          </Pair>
        </div>
        <ErrorMessage>{error}</ErrorMessage>
        <>
          <Button value="last" onClick={handleLastClick}>
            Last
          </Button>
          {/* <Button
            onClick={handleNext}
            disabled={speaking.length < 1 || learning.length < 1}
          >
            Next
          </Button> */}
          <Button
            onClick={() => {
              if (speaking.length < 1 || learning.length < 1) return;
              handleSubmitClick();
            }}
            disabled={speaking.length < 1 || learning.length < 1}
          >
            Get started!
          </Button>
        </>
      </SelectionBlock>
    </>
  );
};

export default StepTwo;
