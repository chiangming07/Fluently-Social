import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import styled from "styled-components/macro";
import dayjs from "dayjs";
import { io } from "socket.io-client";

import noRoom from "./noRoom.png";

import api from "../../utils/api";

import Rooms from "./components/Rooms";
import ChatHeader from "./components/ChatHeader";
import SearchResultComponent from "./components/SearchResult";
import MessagesComponent from "./components/Messages";
import MessageInput from "./components/MessageInput";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;
`;

const ChatMask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 25%;
  right: 0;
  bottom: 0;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e9e6e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
  z-index: 10;
`;

const ChatMaskImage = styled.img`
  width: 30%;
  padding-right: 3%;
  margin-bottom: 5%;
`;

const ChatMaskReminder = styled.div`
  color: #22654e;
  white-space: nowrap;
  font-size: 24px;
  line-height: 1.2;
  font-weight: bold;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 100px;
  background: white;
`;

const Avatar = styled.img`
  width: ${(props) => (props.chat ? "45px" : "50px")};
  height: ${(props) => (props.chat ? "45px" : "50px")};
  margin: ${(props) => (props.chat ? "0 7px" : "0 20px")};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const TimeMessage = styled.span`
  font-size: 12px;
  color: #323232;
  text-align: right;
  margin: 0 5px;
`;

const Chat = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [myId, setMyId] = useState("");
  const [chat, setChat] = useState([]);
  const [chatroomList, setChatroomList] = useState([]);

  const [searchResult, setSearchResult] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [partnerData, setPartnerData] = useState({});

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

    const renderChatroom = async (accessToken) => {
      try {
        const response = await api.getProfile(accessToken);
        if (response.status === 200) {
          let user = JSON.parse(localStorage.getItem("user"));
          setMyId(user.id);
          const response = await api.getChatroomList(user.id, accessToken);
          response.data.forEach((room) => {
            const convertedTime = new Date(room.lastMessage.time);
            convertedTime.setHours(convertedTime.getHours() + 8);
            const year = convertedTime.getFullYear();
            const month = ("0" + (convertedTime.getMonth() + 1)).slice(-2);
            const day = ("0" + convertedTime.getDate()).slice(-2);
            const hour = ("0" + convertedTime.getHours()).slice(-2);
            const minute = ("0" + convertedTime.getMinutes()).slice(-2);
            const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
            room.lastMessage.time = formattedDate;
          });
          setChatroomList(response.data);
          socket.emit("join-room-list", response.data);
          const chatroom = response.data.find((list) => list.roomId === roomId);
          if (chatroom) {
            setPartnerData(chatroom.memberInfo);
          }
        }
      } catch (e) {
        console.log(e);
        errorNotify("Connection timed out. Please log in again.");
        return;
      }
    };

    renderChatroom(accessToken);

    setSearchResult([]);
    setChat([]);

    socket.on("connect", () => {
      console.log("A user connected.");
    });
    socket.emit("join-room", roomId);
  }, [roomId]);

  // websocket
  useEffect(() => {
    const updateChatroomList = (message) => {
      const { roomId, content, type } = message;
      const timestamp = dayjs().format("YYYY/MM/DD HH:mm");
      if (chatroomList.length === 0) return;
      const hasChatroom = chatroomList.some(
        (chatroom) => chatroom.roomId === roomId
      );
      if (hasChatroom) {
        const updatedList = chatroomList.map((chatroom) => {
          if (chatroom.roomId === roomId) {
            const data = type === "text" ? content : "Photo sent.";
            const updatedLastMessage = {
              content: {
                type: type,
                data: data,
              },
              time: timestamp,
            };
            return { ...chatroom, lastMessage: updatedLastMessage };
          }
          return chatroom;
        });
        updatedList.sort((b, a) => {
          return new Date(a.lastMessage.time) - new Date(b.lastMessage.time);
        });

        setChatroomList(updatedList);
      }
      //TODO: 再去資料庫 fetch avatar 等資料
      // if (!hasChatroom) {
      //   chatroomList.push({
      //     roomId,
      //     memberInfo: senderId,
      //     lastMessage: {
      //       content,
      //       time: dayjs().format("YYYY/MM/DD HH:mm"),
      //     },
      //   });
      // }
      // setChatroomList(updatedList);
    };

    socket.on("text message", (message) => {
      const timestamp = dayjs().format("YYYY/MM/DD HH:mm");
      message.type = "text";
      if (message.roomId === roomId) {
        setChat((chat) => [
          ...chat,
          {
            type: "text",
            data: message.content,
            senderId: message.senderId,
            timestamp,
          },
        ]);
        updateChatroomList(message);
      } else {
        updateChatroomList(message);
      }
    });

    socket.on("image message", (message) => {
      const timestamp = dayjs().format("YYYY/MM/DD HH:mm");
      message.type = "image";
      if (message.roomId === roomId) {
        setChat((chat) => [
          ...chat,
          {
            type: "image",
            data: message.content,
            senderId: message.senderId,
            timestamp,
          },
        ]);
        updateChatroomList(message);
      } else {
        updateChatroomList(message);
      }
    });
    return () => {
      socket.off("text message");
      socket.off("image message");
    };
  }, [roomId, chatroomList]);

  return (
    <Wrapper>
      <Rooms chatroomList={chatroomList}></Rooms>
      {!roomId ? (
        <ChatMask>
          <ChatMaskImage src={noRoom} />
          <ChatMaskReminder>Please select a room to join.</ChatMaskReminder>
        </ChatMask>
      ) : (
        <>
          <ChatArea>
            <ChatHeader
              roomId={roomId}
              myId={myId}
              partnerData={partnerData}
              setSearchResult={setSearchResult}
              setCurrentSearch={setCurrentSearch}
            />
            {searchResult.length > 0 ? (
              <SearchResultComponent
                searchResult={searchResult}
                currentSearch={currentSearch}
                setSearchResult={setSearchResult}
              />
            ) : (
              <>
                <MessagesComponent
                  socket={socket}
                  setChat={setChat}
                  roomId={roomId}
                  chat={chat}
                  myId={myId}
                  partnerData={partnerData}
                />
                <MessageInput roomId={roomId} myId={myId} />
              </>
            )}
          </ChatArea>
        </>
      )}
    </Wrapper>
  );
};

export { Chat, Wrapper, ChatArea, Avatar, TimeMessage };

export const socket = io(
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://api.fluently.social/"
    : "http://localhost:8080/",
  {
    autoConnect: true,
  }
);
