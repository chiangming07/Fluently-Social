import React from "react";

import styled from "styled-components/macro";

const flagMapping = {
  "zh-TW": "tw",
  "en-US": "us",
  JP: "jp",
  KR: "kr",
  ES: "es",
};

const FlagImage = styled.img`
  height: 4vh;
  margin-right: 5px;
  border-radius: 50%;
  box-shadow: rgb(216, 216, 216) 0px 0px 3px 2px;
`;
const LanguageFlag = ({ language }) => (
  <FlagImage src={`/flags/${flagMapping[language]}.svg`} alt={language} />
);

export default LanguageFlag;
