import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "../../../recoil/atoms";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";

import MyInfo from "./components/MyInfo";
import MyPreference from "./components/MyPreference";

import api from "../../../utils/api";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  width: 80%;
  margin-top: 150px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20%;
  padding-right: 40px;
  border-right: 3px solid rgba(0, 0, 0, 0.2);
  height: 79vh;
`;

const TabButton = styled.button`
  padding: 15px 30px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: ${({ active }) => (active ? "#5b9f59" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  box-shadow: ${({ active }) =>
    active ? "0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #7cc096" : ""};
  /* font-size: ${({ active }) => (active ? "16px" : "14px")}; */
  font-size: 16px;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #5b9f59ce;
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #7cc096; */
  }
`;

const LogoutButton = styled(TabButton)`
  margin-bottom: 0px;
  position: absolute;
  width: 80%;
  bottom: 10px;
  &:hover {
    color: #e96734ce;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #e96734ce;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [activeTab, setActiveTab] = useState("info");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [speaking, setSpeaking] = useState([]);
  const [learning, setLearning] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);

  const errorNotify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 1500,
      onClose: () => {
        navigate("/login");
      },
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      errorNotify("Please log in to continue.");
      return;
    }

    const renderProfile = async (accessToken) => {
      try {
        const response = await api.getProfile(accessToken);
        if (response.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          const {
            avatar,
            username,
            email,
            gender,
            age,
            speaking,
            learning,
            topic,
          } = user;
          setAvatar(avatar);
          setUsername(username);
          setEmail(email);
          setGender(gender);
          setAge(age);
          setSpeaking(speaking);
          setLearning(learning);
          setSelectedTopic(topic);
        }
      } catch (e) {
        console.log(e.response.data.message);
        errorNotify("Connection timed out. Please log in again.");
        return;
      }
    };
    renderProfile(accessToken);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
    return;
  };
  return (
    <ProfileContainer>
      <ToastContainer />
      <TabContainer>
        <TabButton
          active={activeTab === "info"}
          onClick={() => handleTabClick("info")}
        >
          My Info
        </TabButton>
        <TabButton
          active={activeTab === "preference"}
          onClick={() => handleTabClick("preference")}
        >
          My Preference
        </TabButton>
        <LogoutButton onClick={() => handleLogOut()}>Log out</LogoutButton>
      </TabContainer>
      {activeTab === "info" && (
        <MyInfo
          avatar={avatar}
          username={username}
          email={email}
          gender={gender}
          age={age}
        />
      )}
      {activeTab === "preference" && (
        <MyPreference
          speaking={speaking}
          setSpeaking={setSpeaking}
          learning={learning}
          setLearning={setLearning}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
      )}
    </ProfileContainer>
  );
};

export default Profile;
