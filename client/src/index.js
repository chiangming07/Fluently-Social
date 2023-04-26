import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { io } from "socket.io-client";

import App from "./App";
import Signup from "./pages/User/Signup/Signup";
import Login from "./pages/User/Login/Login";
import Profile from "./pages/User/Profile/Profile";
import { Chat } from "./pages/Chat/Chat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:uuid" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
