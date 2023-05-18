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
  background-color: ${({ disabled }) => (disabled ? "#e0e9e9" : "")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

function LanguageSelector(props) {
  const { label, disabled, language, setLanguage, filteredOptions } = props;
  return (
    <Row>
      <Label>{label}</Label>
      <Select
        disabled={disabled}
        value={language[0]?.language}
        onChange={(e) => setLanguage([{ language: e.target.value }])}
      >
        <option value="">Language</option>
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
    </Row>
  );
}

export default LanguageSelector;
