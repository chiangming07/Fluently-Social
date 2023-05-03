import styled from "styled-components/macro";

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

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: rgb(214, 236, 221);
  border-radius: 8px;
  margin-bottom: 2%;
`;

const CloseButton = styled.span`
  background-color: rgb(137 176 136);
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgb(99, 137, 95);
    color: #fff;
    transform: scale(1.2);
  }
`;

const SearchKeyword = styled.div`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.05rem;
`;

const SearchResultItem = styled.div`
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(61, 61, 57, 0.6);
  margin-bottom: 10px;
  letter-spacing: 0.03rem;
`;

const SearchResultTime = styled.div`
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
`;

const SearchResultHighLight = styled.span`
  background-color: rgb(214, 236, 221);
  color: #666;
  border-radius: 4px;
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
      <SearchBar>
        <SearchKeyword>Keyword: {currentSearch}</SearchKeyword>
        <CloseButton onClick={() => setSearchResult([])}>X</CloseButton>
      </SearchBar>

      {searchResult.map((result) => (
        <SearchResultItem key={result.id}>
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
