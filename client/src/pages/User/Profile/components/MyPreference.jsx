import { toast } from "react-toastify";

import styled from "styled-components/macro";
import { Button } from "../../Style";

import Topic from "./Topic";
import LanguageWrapper from "../../LanguageWrapper";
import {
  languageOptions,
  getFilteredOptions,
} from "../../../../components/languageOptions.js";

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

const MyPreference = (props) => {
  const {
    speaking,
    setSpeaking,
    learning,
    setLearning,
    selectedTopic,
    setSelectedTopic,
  } = props;

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

  const filteredOptions = getFilteredOptions(
    languageOptions,
    speaking,
    learning
  );

  return (
    <Wrapper>
      <Content>
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
export { Button };
