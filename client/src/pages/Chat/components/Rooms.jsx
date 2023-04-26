import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Avatar, TimeMessage } from "../Chat.jsx";

// Rooms (最左)
const RoomsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  background: white;
  z-index: 2;
`;
const Name = styled.div`
  height: 80px;
  margin-top: 100px;
  background: #828a6a;
  background: rgb(99, 137, 95);
  color: white;
  text-align: left;
  padding-left: 2.1em;
  line-height: 80px;
  letter-spacing: 5px;
  font-size: 28px;
  border-radius: 0 0 100px 0;
`;
const Lists = styled.div`
  height: 100%;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100.3px;
  background: white;
  border-bottom: 2px solid rgb(99, 137, 95, 0.1);
  cursor: pointer;
  &:hover {
    background: #cbeb9352;
  }
`;

const Anonymous = styled.div`
  width: 100%;
  background: rgb(99, 137, 95);
  color: white;
  text-align: center;
  line-height: 80px;
  letter-spacing: 2px;
  font-size: 28px;
  border-radius: 0 10px 0 0;
  cursor: pointer;
`;

const OtherName = styled.div`
  font-weight: bold;
  margin-right: 10px;
  margin: 0 5px;
`;

const LastMessage = styled.div`
  color: gray;
  margin: 3px 5px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 150px;
`;
const ChatroomDetail = styled.div`
  display: block;
`;

const RoomList = ({ chatroomList }) => {
  const navigate = useNavigate();

  return (
    <Lists>
      {chatroomList.map(
        (chatroom) =>
          chatroom.lastMessage.content && (
            <List
              key={chatroom._id}
              onClick={() => navigate(`/chat/${chatroom.roomId}`)}
            >
              <Avatar src={chatroom.memberInfo.avatar} alt="others' avatar" />
              <ChatroomDetail>
                <OtherName>{chatroom.memberInfo.username}</OtherName>
                <LastMessage>
                  {chatroom.lastMessage.content.type === "text"
                    ? chatroom.lastMessage.content.data
                    : "Photo sent."}
                </LastMessage>
                <TimeMessage>{chatroom.lastMessage.time}</TimeMessage>
              </ChatroomDetail>
            </List>
          )
      )}
    </Lists>
  );
};

const Rooms = ({ chatroomList }) => {
  const navigate = useNavigate();

  return (
    <RoomsWrapper>
      <Name>Chatroom</Name>
      <RoomList chatroomList={chatroomList} />
      <Anonymous onClick={() => navigate("/chat/anonymous/match")}>
        Anonymous Chat
      </Anonymous>
    </RoomsWrapper>
  );
};

export default Rooms;
