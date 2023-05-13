const languageOptions = [
  { value: "", label: "Language", disabled: true },
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

export { languageOptions, getFilteredOptions };
