// import React, { useState } from "react";
// import styled from "styled-components";
// import {
//   Container,
//   Avatar,
//   Info,
//   Field,
//   ProfileLabel,
//   ProfileInput,
//   Select,
//   GenderSelect,
//   GenderLabel,
//   GenderOption,
//   Button,
// } from "../Style";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  /* font-size: ${({ active }) => (active ? "16px" : "14px")}; */
  font-size: 16px;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #5b9f59ce;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #7cc096;
  }
`;

const LogoutButton = styled(TabButton)`
  margin-bottom: 0px;
  position: absolute;
  width: 80%;
  bottom: 10px;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    const renderProfile = async (accessToken) => {
      try {
        const response = await api.getProfile(accessToken);
        if (response.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          const { username, email, gender, age } = user;
          setUsername(username);
          setEmail(email);
          setGender(gender);
          setAge(age);
        }
      } catch (e) {
        console.log(e.response.data.message);
        alert("Connection timed out. Please log in again.");
        navigate("/login");
        return;
      }
    };
    renderProfile(accessToken);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ProfileContainer>
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
        <LogoutButton>Log out</LogoutButton>
      </TabContainer>
      {activeTab === "info" && (
        <MyInfo username={username} email={email} gender={gender} age={age} />
      )}
      {activeTab === "preference" && <MyPreference />}
    </ProfileContainer>
  );
};

export default Profile;
