import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import robot from "../robot.svg";
import api from "../../../utils/api";

import { Avatar } from "../Chat.jsx";

const ChatHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #bec5a6;
  background-size: 30px 30px, 30px 30px;
  box-shadow: -2px 3px 10px 0px #bec5a6;
  background-size: 20px 20px;
  background-image: radial-gradient(circle, #ffffff 1px, rgba(0, 0, 0, 0) 1px);
  border-radius: 0 0 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e9e6e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
`;

const Partner = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`;

const PartnerName = styled.div`
  font-size: 24px;
  color: white;
`;

const Tool = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`;

const SearchHistory = styled.div`
  position: relative;
  width: 300px;
  --accent-color: #b6e99d;

  &:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  &:before,
  &:after {
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
  }

  &:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
  }

  &:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  &:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
    transform: scaleX(1);
  }

  &:focus-within:after {
    border-bottom: 2px solid var(--accent-color);
    transform: scaleX(1);
  }

  &:after {
    content: "";
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    will-change: transform;
    border-bottom: 2px solid var(--accent-color);
    border-bottom-color: var(--accent-color);
  }
`;

const TextInput = styled.input`
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
  background-color: rgb(99, 137, 95);
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 200ms;
  transition-property: background-color;
  color: #e8e8e8;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  width: 100%;
  border-left: none;
  border-bottom: none;
  border-right: none;
  outline: none;

  &::placeholder {
    transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    opacity: 1;
    user-select: none;
    color: rgba(255, 255, 255, 0.582);
  }

  &:focus,
  &:active {
    background-color: rgb(99, 137, 95);
  }

  ${SearchHistory}:focus-within &,
&:focus,
&:active {
    background-color: rgb(99, 137, 95);
  }

  ${SearchHistory}:focus-within &::placeholder {
    opacity: 0;
  }
`;

const Robot = styled.div`
  width: 70px;
  height: 50px;
  margin: 0 20px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: filter 0.2s ease-in-out;
  &:hover {
    filter: invert(0.8) sepia(50%);
    cursor: pointer;
  }
`;

const Abstract = styled(Robot)`
  background-image: url(${robot});
  position: relative;
  &:hover::before {
    content: "Get today's abstract!";
    position: absolute;
    bottom: -35px;
    transform: translateX(-50%);
    padding: 8px;
    border-radius: 4px;
    background-color: #fbfbfb;
    color: #170808;
    font-size: 14px;
    z-index: 1;
    white-space: nowrap;
  }
`;

const ChatHeader = (props) => {
  const { roomId, myId, partnerData, setSearchResult, setCurrentSearch } =
    props;
  const [search, setSearch] = useState("");

  const sendAbstract = async () => {
    const data = { roomId, myId };
    const response = await api.sendAbstract(data);
    if (response.status === 200) alert("Email sent!");
  };

  const searchKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (search) {
        setSearch("");
        const sortChatHistory = async (roomId, search) => {
          const response = await api.searchHistory(roomId, search);
          console.log(response);
          const searchResult = response.data.map((msg) => {
            const time = dayjs(msg.createdAt).format("YYYY/MM/DD HH:mm");
            return {
              id: msg._id,
              data: msg.highlights[0].texts,
              timestamp: time,
              senderId: msg.senderId,
            };
          });
          setSearchResult(searchResult);
        };
        sortChatHistory(roomId, search);
      }
    }
  };

  return (
    <ChatHeaderWrapper>
      <Partner>
        <Avatar src={partnerData.avatar}></Avatar>
        <PartnerName>{partnerData.username}</PartnerName>
        {/* <PartnerStatus></PartnerStatus> */}
      </Partner>
      <Tool>
        <SearchHistory>
          <TextInput
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentSearch(e.target.value);
            }}
            onKeyDown={(e) => searchKeyDown(e)}
          ></TextInput>
        </SearchHistory>
        <Abstract
          onClick={(e) => {
            alert("Sending email... Please check it later.");
            sendAbstract(e);
          }}
          icon={robot}
        />
      </Tool>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
