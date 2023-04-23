import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box; 
    /* border: 1px solid black !important; */
    margin: 0;
    padding: 0;
  },
  body {
    font-family: 'Noto Sans TC', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
