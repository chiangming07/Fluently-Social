import { useEffect, useRef, useState } from "react";

import styled from "styled-components/macro";

import dayjs from "dayjs";

import { Avatar, TimeMessage } from "../Chat.jsx";

import api from "../../../utils/api";

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
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
  max-width: 48%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

const LeftMessage = styled(Message)`
  max-width: 43%;
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

const MessagesComponent = (props) => {
  const { roomId, chat, myId, partnerData } = props;
  const earlyMessagesRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [history, setHistory] = useState([]);
  const [paging, setPaging] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 向下滾動
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // 取得歷史聊天記錄
  useEffect(() => {
    setHistory([]);
    const getChatHistory = async (roomId, paging) => {
      const response = await api.getChatHistory(roomId, paging);
      const chatHistory = response.data.messages.map((msg) => {
        const time = dayjs(msg.createdAt).format("YYYY/MM/DD HH:mm");
        return {
          type: msg.content.type,
          data: msg.content.data,
          timestamp: time,
          senderId: msg.senderId,
          roomId: msg.roomId,
        };
      });
      chatHistory.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });

      setHistory((prevHistory) => [...prevHistory, ...chatHistory]);
      setPaging((prevPaging) => prevPaging + 1);
      setHasMore(chatHistory.length > 0);
    };
    getChatHistory(roomId, paging);

    if (hasMore && earlyMessagesRef.current) {
      const messageContainer = earlyMessagesRef.current;
      const threshold = 50;
      const containerHeight = messageContainer.clientHeight;
      const scrollTop = messageContainer.scrollTop;
      const scrollHeight = messageContainer.scrollHeight;

      if (scrollHeight - (scrollTop + containerHeight) < threshold) {
        api.getChatHistory(roomId, paging);
      }
    }
    // }, [hasMore, earlyMessagesRef, paging]);
  }, [roomId]);

  return (
    <Messages>
      {history.concat(chat).map((msg, index) => {
        const isSelf = msg.senderId === myId;
        return (
          <div key={index}>
            {isSelf ? (
              <RightMessage self>
                <RightContent>
                  <TimeMessage>{msg.timestamp}</TimeMessage>
                  {msg.type === "text" ? (
                    <TextMessage self>{msg.data}</TextMessage>
                  ) : (
                    <ImageMessage
                      self
                      src={msg.data}
                      alt="chat image"
                      onLoad={scrollToBottom}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </RightContent>
              </RightMessage>
            ) : (
              <Message>
                <Avatar chat src={partnerData.avatar}></Avatar>
                <LeftMessage>
                  <TimeMessage>{msg.timestamp}</TimeMessage>
                  {msg.type === "text" ? (
                    <TextMessage>{msg.data}</TextMessage>
                  ) : (
                    <ImageMessage src={msg.data} alt="chat image" />
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
