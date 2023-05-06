import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import styled from "styled-components/macro";

import { socket } from "../Chat/Chat";

import MessagesComponent from "./components/Messages";
import MessageInput from "./components/MessageInput";
import LanguageSelector from "./components/LanguageSelector";
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
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  position: relative;
  /* &:after {
    content: "";
    display: ${({ disabled }) => (disabled ? "block" : "none")};
    cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"}; !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(197, 232, 198, 0.153);
  } */
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 100px;
  background: white;
`;

// const Match = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 400px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;
// const RadioLabel = styled.label`
//   margin-right: 10px;
// `;

// const RadioInput = styled.input`
//   margin-right: 5px;
// `;
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
  const [speaking, setSpeaking] = useState("");
  const [learning, setLearning] = useState("");
  const [socketId, setSocketId] = useState("");
  const [isMatched, setIsMatched] = useState(false);
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
    const langMap = {
      "zh-TW": 1,
      "en-US": 2,
      JP: 3,
      ES: 4,
    };
    const data = {
      socketId,
      speaking: langMap[speaking],
      learning: langMap[learning],
    };
    try {
      console.log(data);
      const response = await api.matchPartner(data);
      if (response.data.roomId) {
        return;
      }
      const msg = response.data.msg;
      successNotify(msg);
    } catch (e) {
      const errMsg = e.response.data.message;
      if (errMsg) errorNotify(errMsg);
    }
  };

  const handleClear = async () => {
    try {
      const response = await api.clearMatch();
      if (response.status === 200)
        successNotify("Successfully cleared the matching data");
    } catch (e) {
      errorNotify("You are not in the waiting list. Please try again later.");
    }
  };
  return (
    <Wrapper>
      <MatchForm disabled={isMatched}>
        <LanguageSelector
          label="I can speak..."
          name="teaching"
          id="speaking"
          onChange={(e) => setSpeaking(e.target.value)}
          disabled={isMatched}
        />
        <LanguageSelector
          label="I want to practice..."
          name="learning"
          id="learning"
          onChange={(e) => setLearning(e.target.value)}
          disabled={isMatched}
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
        // <Loading></Loading>
        <Canvas></Canvas>
      ) : (
        <ChatArea>
          <MessagesComponent socket={socket} roomId={roomId} myId={socketId} />
          <MessageInput
            roomId={roomId}
            myId={socketId}
            setIsMatched={setIsMatched}
          />
        </ChatArea>
      )}
    </Wrapper>

    //     <RadioWrapper>
    //       <input type="radio" value="native" />
    //       <span>native</span>
    //       <input type="radio" value="nonnative" />
    //       <span>non-native</span>
    //     </RadioWrapper>
    //     <RadioWrapper>
    //       <input type="radio" value="native" />
    //       <span>native</span>
    //       <input type="radio" value="nonnative" />
    //       <span>non-native</span>
    //     </RadioWrapper>
  );
};

export default Anonymous;
