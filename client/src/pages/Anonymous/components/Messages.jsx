import { useEffect, useRef, useState } from "react";

import styled from "styled-components/macro";

import dayjs from "dayjs";

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

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e9e6e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
`;

const Message = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const RightMessage = styled(Message)`
  justify-content: flex-end;
`;
const RightContent = styled.div`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

const LeftMessage = styled(Message)`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: auto;
`;

const TextMessage = styled.div`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.self ? "rgb(214, 236, 221)" : "rgb(229 229 229)"};
  border-radius: 16px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: 100%;
`;
const ImageMessage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 5px;
  border: 10px solid
    ${(props) => (props.self ? "rgb(214, 236, 221)" : "rgb(229 229 229)")};
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
`;

const BroadCastMessage = styled(TextMessage)`
  width: 72.5vw;
  text-align: center;
  background-color: #f1d786;
`;

const MessagesComponent = (props) => {
  const { roomId, myId, socket } = props;
  const messagesEndRef = useRef(null);

  const [chat, setChat] = useState([]);
  const [partnerData, setPartnerData] = useState({});

  // 向下滾動
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // socket
  useEffect(() => {
    // socket.emit("join-room", roomId);
    const timestamp = dayjs().format("YYYY/MM/DD HH:mm");
    socket.on("anonymous text message", (message) => {
      setChat((chat) => [
        ...chat,
        {
          type: "text",
          data: message.content,
          senderId: message.senderId,
          timestamp,
        },
      ]);
    });
    socket.on("anonymous image message", (message) => {
      setChat((chat) => [
        ...chat,
        {
          type: "image",
          data: message.content,
          senderId: message.senderId,
          timestamp,
        },
      ]);
    });
    socket.on("broadcast message", (message) => {
      setChat((chat) => [
        ...chat,
        {
          type: "broadcast",
          data: message.content,
          timestamp,
        },
      ]);
    });
    return () => {
      socket.off("anonymous text message");
      socket.off("anonymous image message");
      socket.off("broadcast message");
    };
  }, [myId, roomId]);

  return (
    <Messages>
      <BroadCastMessage>Match Successfully🌱</BroadCastMessage>
      {chat.map((msg) => {
        const isSelf = msg.senderId === myId;
        return (
          <div key={msg.index}>
            {isSelf ? (
              <RightMessage self>
                <RightContent>
                  <TimeMessage>{msg.timestamp}</TimeMessage>
                  {msg.type === "text" ? (
                    <TextMessage self>{msg.data}</TextMessage>
                  ) : (
                    <ImageMessage self src={msg.data} alt="chat image" />
                  )}
                  <div ref={messagesEndRef} />
                </RightContent>
              </RightMessage>
            ) : (
              <Message>
                {/* <Avatar chat src={partnerData.avatar}></Avatar> */}
                <LeftMessage>
                  <TimeMessage>{msg.timestamp}</TimeMessage>
                  {msg.type === "text" ? (
                    <TextMessage>{msg.data}</TextMessage>
                  ) : msg.type === "image" ? (
                    <ImageMessage src={msg.data} alt="chat image" />
                  ) : (
                    <BroadCastMessage>{msg.data}</BroadCastMessage>
                  )}
                  <div ref={messagesEndRef} />
                </LeftMessage>
              </Message>
            )}
          </div>
        );
      })}
    </Messages>
  );
};

export default MessagesComponent;
