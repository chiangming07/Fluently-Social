import { useState } from "react";

import styled from "styled-components/macro";

import { Button } from "./Style";
import LanguageFlag from "../../components/LanguageFlag/LanguageFlag";
import remove from "./remove.svg";

const Wrapper = styled.div`
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

const LanguageWrapper = (props) => {
  const { type, state, setState, filteredOptions } = props;
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleAddLanguage = () => {
    let newLanguage, newLevel, newItems;
    newLanguage = selectedLanguage;
    newLevel = selectedLevel;
    newItems = [...state, { language: newLanguage, level: newLevel }];
    setSelectedLanguage("");
    setSelectedLevel("");
    setState(newItems);
  };

  const handleRemoveLanguage = (index) => {
    const updatedState = [...state];
    updatedState.splice(index, 1);
    setState(updatedState);
  };

  const levelOptions = {
    speaking: [
      { value: "advanced", label: "Advanced" },
      { value: "native", label: "Native" },
    ],
    learning: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  };

  return (
    <Wrapper>
      <SelectWrapper>
        <Select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="" disabled>
            Language
          </option>
          {filteredOptions.map((option) => {
            return (
              <option
                key={option?.value}
                value={option?.value}
                disabled={option?.disabled}
              >
                {option.label}
              </option>
            );
          })}
        </Select>
        <Select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="" disabled>
            Level
          </option>
          {levelOptions[type] &&
            levelOptions[type].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </Select>
        <Button
          onClick={() => {
            if (!selectedLanguage || !selectedLevel || state.length >= 3)
              return;
            handleAddLanguage(type);
          }}
          disabled={!selectedLanguage || !selectedLevel || state.length >= 3}
        >
          Add
        </Button>
      </SelectWrapper>
      <PairWrapper>
        {state.map((item, index) => (
          <Pair key={index}>
            <LanguageFlag language={item?.language} />
            <span>{item?.level}</span>
            <Remove
              src={remove}
              onClick={() => {
                if (state.length <= 1) return;
                handleRemoveLanguage(index);
              }}
              disabled={state.length <= 1}
            />
          </Pair>
        ))}
      </PairWrapper>
    </Wrapper>
  );
};

export default LanguageWrapper;
