import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";

import api from "../../utils/api";

import Rooms from "./components/Rooms";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

// ChatArea (中間)
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
`;

const TimeMessage = styled.span`
  font-size: 12px;
  color: #999;
  text-align: right;
  margin: 0 5px;
`;

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [myId, setMyId] = useState("");
  const [partnerData, setPartnerData] = useState({});
  const [chatroomList, setChatroomList] = useState([]);
  const [chat, setChat] = useState([]);

  const roomId = location.pathname.split("/chat/")[1];
  let accessToken;
  useEffect(() => {
    setChat([]);
  }, [roomId]);

  useEffect(() => {
    accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    const renderChatroom = async (accessToken) => {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        setMyId(user.id);
        const response = await api.getChatroomList(user.id, accessToken);

        setChatroomList(response.data);
        // TODO: 一次 query 出來會不會比較好？
        for (let list of response.data) {
          if (list.roomId === roomId) {
            setPartnerData(list.memberInfo);
          }
        }
      } catch (e) {
        console.log(e.response.data.message);
        alert("Connection timed out. Please log in again.");
        navigate("/login");
        return;
      }
    };
    renderChatroom(accessToken);
  }, [roomId]);

  return (
    <Wrapper>
      <Rooms chatroomList={chatroomList}></Rooms>
      <ChatArea></ChatArea>
    </Wrapper>
  );
};

export { Chat, Avatar, TimeMessage };
