import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInAtom } from "../../../recoil/atoms";

import { toast } from "react-toastify";

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
  width: 85%;
  margin-top: 150px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 30%;
  padding-right: 40px;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  height: 79vh;
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 10px;
  width: calc(100% - 40px);
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #e96734ce;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #e96734ce;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [speaking, setSpeaking] = useState([]);
  const [learning, setLearning] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);

  const errorNotify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      style: {
        top: "100px",
      },
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
          const { avatar, username, email, speaking, learning, topic } = user;
          setAvatar(avatar);
          setUsername(username);
          setEmail(email);
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

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
    return;
  };
  return (
    <ProfileContainer>
      <InfoContainer>
        <MyInfo
          avatar={avatar}
          setAvatar={setAvatar}
          username={username}
          email={email}
        />
        <LogoutButton onClick={() => handleLogOut()}>Log out</LogoutButton>
      </InfoContainer>
      <MyPreference
        speaking={speaking}
        setSpeaking={setSpeaking}
        learning={learning}
        setLearning={setLearning}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
    </ProfileContainer>
  );
};

export default Profile;
