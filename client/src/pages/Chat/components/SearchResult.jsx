import styled from "styled-components";

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e6e9e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 45px;
  background-color: #bec5a6;
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #2e8b57;
    color: #fff;
    transform: scale(1.2);
  }
`;

const SearchKeyword = styled.span`
  margin: 10px 0;
  background-color: #cbeb93b1;
  padding: 10px;
  font-size: 16spx;
  font-weight: bold;
  border-radius: 4px;
`;

const SearchResultItem = styled.div`
  padding: 8px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 3px rgba(61, 61, 57, 0.6);
  margin-bottom: 10px;
`;

const SearchResultTime = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SearchResultHighLight = styled.span`
  background-color: #cbeb93b1;
  color: #666;
  border-radius: 50%;
  font-size: 16px;
`;

const SearchResultText = styled.span`
  color: #666;
  font-size: 16px;
`;

const SearchResultComponent = (props) => {
  const { searchResult, currentSearch, setSearchResult } = props;
  return (
    <SearchResult>
      <CloseButton onClick={() => setSearchResult([])}>X</CloseButton>
      <SearchKeyword>{currentSearch}</SearchKeyword>
      {searchResult.map((result) => (
        <SearchResultItem key={result._id}>
          <SearchResultTime>{result.timestamp}</SearchResultTime>
          {result.data.map((item, index) =>
            item.type === "hit" ? (
              <SearchResultHighLight key={index}>
                {item.value}
              </SearchResultHighLight>
            ) : (
              <SearchResultText key={index}>{item.value}</SearchResultText>
            )
          )}
        </SearchResultItem>
      ))}
    </SearchResult>
  );
};

export default SearchResultComponent;
