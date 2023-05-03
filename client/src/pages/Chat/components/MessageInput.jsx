import { useRef, useState } from "react";

import styled from "styled-components/macro";

import image from "../image.svg";
import send from "../send.svg";

import { socket } from "../Chat";

import api from "../../../utils/api";

const InputWrapper = styled.div`
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #e9e6e68f 1px, transparent 1px),
    linear-gradient(to bottom, #e9e6e68f 1px, transparent 1px);
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 90%;
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
  border-radius: 10px;
  outline: none;
`;

const Image = styled.input.attrs({ type: "file" })`
  display: none;
`;
const UploadLabel = styled.label`
  border: none;
  padding: 0 1rem;
  height: 2rem;
  border-radius: 10px;
  margin: 0.25rem;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: center;
  transition: filter 0.2s ease-in-out;
  &:hover {
    filter: invert(1) sepia(50%);
    cursor: pointer;
  }
  cursor: pointer;
`;

const Send = styled.div`
  border: none;
  padding: 0 1rem;
  height: 2rem;
  border-radius: 10px;
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
    filter: invert(1) sepia(50%);
    cursor: pointer;
  }
`;

const MessageInput = (props) => {
  const { roomId, myId } = props;

  const fileInputRef = useRef(null);
  const [msg, setMsg] = useState("");

  const handleFileChange = async () => {
    const file = fileInputRef.current.files[0];

    try {
      const response = await api.getPresignedURL();
      const { URL, imageName } = response.data;

      await api.uploadToS3(URL, file);
      const imageURL = URL.split("?")[0];
      const message = {
        roomId,
        senderId: myId,
        content: imageURL,
      };

      socket.emit("image message", message);
    } catch (error) {
      // handle error
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
      socket.emit("text message", message);
    }
  };
  return (
    <InputWrapper>
      <InputBox>
        <Input
          placeholder={"Type your message here"}
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
