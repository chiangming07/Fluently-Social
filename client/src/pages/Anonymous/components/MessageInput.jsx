import { useRef, useState } from "react";
import { toast } from "react-toastify";

import styled from "styled-components/macro";

import image from "../../Anonymous/image.svg";
import send from "../../Anonymous/send.svg";

import { socket } from "../../Chat/Chat";

import api from "../../../utils/api";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e9e6e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
`;

const Leave = styled.div`
  width: 10%;
  height: 4rem;
  margin-left: 1.5rem;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 4rem;
  transition: 0.3s;
  color: white;
  background-color: #528271;
  cursor: pointer;
  &:hover {
    color: #071b14;
    text-shadow: -0.5px -0.5px 0 #e7ece6, 1px -0.5px 0 #e7ece6,
      -0.5px 1px 0 #e7ece6, 1px 1px 0 #e7ece6;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 85%;
  height: 4rem;
  margin: 1rem auto;
  background: rgb(214, 236, 221);
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  margin: 0.25rem;
  border: 1px solid rgb(99, 137, 95);
  border-radius: 8px;
  outline: none;
`;

const Image = styled.input.attrs({ type: "file" })`
  display: none;
`;
const UploadLabel = styled.label`
  border: none;
  padding: 0 1rem;
  height: 2rem;
  margin: 0.25rem;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: center;
  transition: filter 0.2s ease-in-out;
  &:hover {
    filter: invert(0.5);
    cursor: pointer;
  }
  cursor: pointer;
`;

const Send = styled.div`
  border: none;
  padding: 0 1rem;
  height: 2rem;
  margin: 0.25rem;
  cursor: pointer;
`;

const TextButton = styled(Send)`
  background-image: url(${send});
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: center;
  transition: filter 0.2s ease-in-out;
  &:hover {
    filter: invert(0.5);
    cursor: pointer;
  }
`;

const MessageInput = (props) => {
  const { roomId, myId, setIsMatched, setIsMatching } = props;
  const fileInputRef = useRef(null);
  const [msg, setMsg] = useState("");

  const handleFileChange = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;
    try {
      const response = await api.getPresignedURL();
      const { URL } = response.data;

      await api.uploadToS3(URL, file);
      const imageURL = URL.split("?")[0];
      const message = {
        roomId,
        senderId: myId,
        content: imageURL,
      };

      socket.emit("anonymous image message", message);
    } catch (error) {
      console.log(error);
      toast.error(error, {
        style: {
          top: "100px",
        },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      btnHandler();
    }
  };

  const btnHandler = () => {
    setMsg("");
    if (msg) {
      const message = {
        roomId,
        senderId: myId,
        content: msg,
      };
      socket.emit("anonymous text message", message);
    }
  };

  const handleLeave = () => {
    const message = {
      roomId,
      socketId: myId,
      content: "Your partner has left the room🌱",
    };
    socket.emit("leave anonymous chatroom", message);
    setIsMatched(false);
    setIsMatching(false);
  };

  return (
    <InputWrapper>
      <Leave onClick={(e) => handleLeave(e)}>Leave</Leave>
      <InputBox>
        <Input
          placeholder="Enter a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Image id="file" ref={fileInputRef} onChange={handleFileChange} />
        <UploadLabel htmlFor="file" />
        <TextButton onClick={(e) => btnHandler(e)} />
      </InputBox>
    </InputWrapper>
  );
};

export default MessageInput;
