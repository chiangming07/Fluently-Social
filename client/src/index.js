import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home/Home";
import Signup from "./pages/User/Signup/Signup";
import Login from "./pages/User/Login/Login";
import Profile from "./pages/User/Profile/Profile";
import { Chat } from "./pages/Chat/Chat";
import Anonymous from "./pages/Anonymous/Anonymous";
import Community from "./pages/Community/Community";
import NotFound from "./pages/NotFound/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/nearme" element={<Community />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
