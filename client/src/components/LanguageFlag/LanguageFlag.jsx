import React from "react";

import styled from "styled-components/macro";

const flagMapping = {
  "ar-SA": "ps",
  BE: "be",
  "zh-TW": "tw",
  "zh-CN": "cn",
  "zh-HK": "hk",
  "zh-MO": "mo",
  CZ: "cz",
  DK: "dk",
  "en-US": "us",
  "en-GB": "gb",
  FI: "fi",
  "fr-FR": "fr",
  "de-DE": "de",
  GR: "gr",
  IS: "is",
  IN: "in",
  IL: "il",
  ID: "id",
  "it-IT": "it",
  JP: "jp",
  KR: "kr",
  MY: "my",
  PL: "pl",
  "pt-BR": "br",
  "pt-PT": "pt",
  RU: "ru",
  ES: "es",
  SE: "se",
  TH: "th",
  NL: "bq",
  TR: "tr",
  UA: "ua",
  VN: "vn",
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
