import styled from "styled-components/macro";

const topics = [
  "Travel",
  "Food",
  "Sports",
  "Music",
  "Movies",
  "Books",
  "Art",
  "Pets",
  "Technology",
  "Fashion",
  "Work",
  "Love",
  "Friendship",
  "Family",
  "Education",
  "Health",
];

const TopicWrapper = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const TopicContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 50%;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  display: none;

  &:checked ~ label::before {
    content: "\\1F331";
    width: 20px;
    height: 20px;
    line-height: 0px;
    border: 1px solid #dcb63064;
    background-color: #dcb63064;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
  }
`;

const TopicLabel = styled.label`
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &::before {
    content: "\\00a0";
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
  }
`;

const Topic = ({ selectedTopic, setSelectedTopic }) => {
  const handleCheckboxChange = (topic) => {
    setSelectedTopic((prev) =>
      prev?.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <TopicWrapper>
      {topics.map((topic) => (
        <TopicContainer key={topic}>
          <Checkbox
            id={topic}
            checked={selectedTopic?.includes(topic)}
            onChange={() => handleCheckboxChange(topic)}
          />
          <TopicLabel htmlFor={topic}>{topic}</TopicLabel>
        </TopicContainer>
      ))}
    </TopicWrapper>
  );
};

export default Topic;
