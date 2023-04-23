import { Input, Label, ErrorMessage, Button } from "../Signup";
import {
  FormContent,
  RadioGroup,
  RadioLabel,
  CheckboxGroup,
  CheckboxLabel,
  AvatarUpload,
  AvatarPreview,
  AvatarInput,
  FileInput,
} from "../../Style";
import { useState } from "react";

const Topics = ["Music", "Sports", "Food", "Movies", "Travel"];

const StepThree = (props) => {
  const { error, handleLastClick, handleSubmitClick } = props;

  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("male");
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

  const handleCheckboxChange = (e) => {
    const topic = e.target.value;
    if (topics.includes(topic)) {
      setTopics(topics.filter((item) => item !== topic));
      console.log(topics);
    } else {
      setTopics([...topics, topic]);
    }
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedTopics([...selectedTopics, topic]);
    } else {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <FormContent>
      <h1>
        Improve your partner matching experience by sharing more information
        with us (optional).
      </h1>
      <Label>Age:</Label>
      <Input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <RadioGroup>
        <Label>Gender:</Label>
        <RadioLabel>
          <Input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === "male"}
            onChange={handleGenderChange}
          />
          Male
        </RadioLabel>
        <RadioLabel>
          <Input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === "female"}
            onChange={handleGenderChange}
          />
          Female
        </RadioLabel>
        <RadioLabel>
          <Input
            type="radio"
            name="gender"
            value="custom"
            checked={selectedGender === "custom"}
            onChange={handleGenderChange}
          />
          Custom
        </RadioLabel>
      </RadioGroup>
      <CheckboxGroup>
        <Label>Topics:</Label>
        {Topics.map((topic) => (
          <CheckboxLabel key={topic}>
            <Input
              type="checkbox"
              name="topics"
              value={topic}
              checked={topics.includes(topic)}
              onChange={handleCheckboxChange}
            />
            {topic}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>
      <Label>Avatar:</Label>
      <FileInput
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button value="last" onClick={handleLastClick}>
        Last
      </Button>
      <Button onClick={handleSubmitClick}>Get started!</Button>
    </FormContent>
  );
};

export default StepThree;
