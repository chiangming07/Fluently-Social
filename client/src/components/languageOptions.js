const languageOptions = [
  { value: "ar-SA", label: "Arabic - Saudi Arabia" },
  { value: "BE", label: "Belgium" },
  { value: "zh-TW", label: "Chinese(Traditional)" },
  { value: "zh-CN", label: "Chinese(Simplified)" },
  { value: "zh-HK", label: "Cantonese - Hong Kong" },
  { value: "zh-MO", label: "Cantonese - Macau" },
  { value: "CZ", label: "Czech" },
  { value: "DK", label: "Denmark" },
  { value: "en-US", label: "English - United States" },
  { value: "en-GB", label: "English - United Kingdom" },
  { value: "FI", label: "Finland" },
  { value: "fr-FR", label: "France" },
  { value: "de-DE", label: "Germany" },
  { value: "GR", label: "Greece" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IL", label: "Israel" },
  { value: "it-IT", label: "Italy" },
  { value: "JP", label: "Japanese" },
  { value: "KR", label: "Korea" },
  { value: "MY", label: "Malaysia" },
  { value: "PL", label: "Polish" },
  { value: "pt-BR", label: "Portuguese - Brazil" },
  { value: "pt-PT", label: "Portuguese - Portugal" },
  { value: "RU", label: "Russia" },
  { value: "ES", label: "Spanish - Spain" },
  { value: "SE", label: "Sweden" },
  { value: "TH", label: "Thailand" },
  { value: "NL", label: "the Netherlands" },
  { value: "TR", label: "Turkey" },
  { value: "UA", label: "Ukraine" },
  { value: "VN", label: "Vietnam" },
];

const getFilteredOptions = (languageOptions, speaking, learning) => {
  return languageOptions.map((option) => {
    const isSpeakingLanguage = speaking.some(
      (item) => item.language === option?.value
    );
    const isLearningLanguage = learning.some(
      (item) => item.language === option?.value
    );
    const isDisabled = isSpeakingLanguage || isLearningLanguage;
    return {
      ...option,
      disabled: isDisabled,
    };
  });
};

const languageMap = {
  "ar-SA": "001",
  BE: "002",
  "zh-TW": "003",
  "zh-CN": "004",
  "zh-HK": "005",
  "zh-MO": "006",
  CZ: "007",
  DK: "008",
  "en-US": "009",
  "en-GB": "010",
  FI: "011",
  "fr-FR": "012",
  "de-DE": "013",
  GR: "014",
  IS: "015",
  IN: "016",
  ID: "017",
  IL: "018",
  "it-IT": "019",
  JP: "020",
  KR: "021",
  MY: "022",
  PL: "023",
  "pt-BR": "024",
  "pt-PT": "025",
  RU: "026",
  ES: "027",
  SE: "028",
  TH: "029",
  NL: "030",
  TR: "031",
  UA: "032",
  VN: "033",
};

export { languageOptions, getFilteredOptions, languageMap };
