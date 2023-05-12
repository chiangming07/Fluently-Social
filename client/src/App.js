import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./index.css";
import { RecoilRoot } from "recoil";

import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box; 
    /* border: 1px solid black !important; */
    margin: 0;
    padding: 0;
    color: #071b14;
  },
  body {
    font-family: 'Noto Sans TC', sans-serif;
  }
`;

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Header />
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
