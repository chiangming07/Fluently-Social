import styled from "styled-components/macro";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 80%;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Select = styled.select`
  width: 20vw;
  padding: 10px 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: 1px solid #80b77b;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const LANGUAGES = [
  { value: "zh-TW", label: "Chinese" },
  { value: "en-US", label: "English" },
  { value: "JP", label: "Japanese" },
  { value: "ES", label: "Spanish" },
  // 添加更多支援的語言
];

function LanguageSelector(props) {
  const { label, name, id, onChange, disabled } = props;

  return (
    <Row>
      <Label>{label}</Label>
      <Select
        defaultValue=""
        id={id}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          Please Select a language
        </option>
        {LANGUAGES.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </Select>
    </Row>
  );
}

export default LanguageSelector;
