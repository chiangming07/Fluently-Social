import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import styled from "styled-components/macro";

import { socket } from "../Chat/Chat";

import MessagesComponent from "./components/Messages";
import MessageInput from "./components/MessageInput";
import LanguageSelector from "./components/LanguageSelector";
import {
  languageOptions,
  getFilteredOptions,
  languageMap,
} from "../../components/languageOptions.js";
import Canvas from "./components/Canvas";

import api from "../../utils/api";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const MatchForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  height: 100%;
  padding-top: 15%;
  border-radius: 4px;
  position: relative;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 100px;
  background: white;
`;

const ButtonArea = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  position: relative;
  z-index: 1;
  width: 65%;
  margin-top: 20px;
  padding: 10px 20px;
  border: 2px solid #80b77b;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  border-radius: 8px;
  transition: 0.3s;
  background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "transparent")};
  color: ${({ disabled }) => (disabled ? "#9b9b9b" : "#80b77b")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#e1e1e1" : "#80b77b")};
    color: ${({ disabled }) => (disabled ? "#9b9b9b" : "white")};
  }
`;

const Anonymous = () => {
  const [speaking, setSpeaking] = useState([]);
  const [learning, setLearning] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [isMatched, setIsMatched] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.emit("anonymous", "New user joined anonymous page.");
    socket.on("socketId", (id) => {
      setSocketId(id);
    });
    socket.on("match", (roomId) => {
      setIsMatched(true);
      setRoomId(roomId);
      socket.emit("anonymous join room", roomId);
    });
  }, []);

  useEffect(() => {});

  const successNotify = (msg) => {
    toast.success(msg, {
      style: {
        top: "100px",
      },
      icon: "🌱",
    });
  };
  const errorNotify = (msg) => {
    toast.error(msg, {
      style: {
        top: "100px",
      },
    });
  };

  //TODO: 清掉
  //   useEffect(() => {
  //     const clearSocketId = async () => {
  //       window.addEventListener("beforeunload", async () => {
  //         console.log("正在清除 socket");
  //         const response = await api.clearMatch();
  //         console.log(response);
  //       });
  //     };

  //     clearSocketId();

  //     return () => {
  //       window.removeEventListener("beforeunload");
  //     };
  //   }, []);

  const handleMatch = async () => {
    if (!speaking[0] || !learning[0]) {
      errorNotify(
        "Please select the language you speak and you want to practice."
      );
      return;
    }
    const data = {
      socketId,
      speaking: languageMap[speaking[0].language],
      learning: languageMap[learning[0].language],
    };
    try {
      const response = await api.matchPartner(data);
      if (response.data.roomId) {
        return;
      }
      const msg = response.data.msg;
      setIsMatching(true);
      successNotify(msg);
    } catch (e) {
      const errMsg = e.response.data.message;
      if (errMsg) errorNotify(errMsg);
    }
  };

  const handleClear = async () => {
    if (!speaking[0] || !learning[0]) {
      errorNotify("You are not in the waiting list. Please try again later.");
      return;
    }
    try {
      const response = await api.clearMatch();
      if (response.status === 200) {
        setSpeaking([{ language: "" }]);
        setLearning([{ language: "" }]);
        setIsMatching(false);
        successNotify("Successfully cleared the matching data");
      }
    } catch (e) {
      errorNotify("You are not in the waiting list. Please try again later.");
    }
  };

  const filteredOptions = getFilteredOptions(
    languageOptions,
    speaking,
    learning
  );

  return (
    <Wrapper>
      <MatchForm disabled={isMatched}>
        <LanguageSelector
          label="I can speak..."
          language={speaking}
          setLanguage={setSpeaking}
          disabled={isMatching}
          filteredOptions={filteredOptions}
        />
        <LanguageSelector
          label="I want to practice..."
          language={learning}
          setLanguage={setLearning}
          disabled={isMatching}
          filteredOptions={filteredOptions}
        />
        <ButtonArea>
          <Button
            onClick={() => {
              if (isMatched) return;
              handleMatch();
            }}
            disabled={isMatched}
          >
            Match
          </Button>
          <Button
            onClick={() => {
              if (isMatched) return;
              handleClear();
            }}
            disabled={isMatched}
          >
            Unmatch
          </Button>
        </ButtonArea>
      </MatchForm>
      {isMatched === false ? (
        <Canvas></Canvas>
      ) : (
        <ChatArea>
          <MessagesComponent socket={socket} roomId={roomId} myId={socketId} />
          <MessageInput
            roomId={roomId}
            myId={socketId}
            setIsMatched={setIsMatched}
            setIsMatching={setIsMatching}
          />
        </ChatArea>
      )}
    </Wrapper>
  );
};

export default Anonymous;
