import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { profileAvatarAtom } from "../../../../recoil/atoms";

import { toast } from "react-toastify";

import styled from "styled-components/macro";

import member from "./member.svg";
import upload from "./upload.svg";

import api from "../../../../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 20px;
  font-weight: bold;
  word-break: break-word;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -24%;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 2px solid #e0e9e9;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 48px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 3px #d9b99a;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const Upload = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 30%;
  width: 32px;
  height: 32px;
  box-shadow: 0px 0px 10px 1px #d9b99a;
  background-color: rgb(214, 236, 221);
  border-radius: 50%;

  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    filter: invert(0.8) sepia(50%);
  }
`;

const UploadIcon = styled.label`
  display: block;
  width: 20px;
  height: 20px;
  background-image: url(${upload});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const Image = styled.input.attrs({ type: "file" })`
  display: none;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20%;
`;

const Label = styled.span`
  width: 30%;
  padding-right: 24px;
  font-size: 16px;
  font-weight: bold;
`;

const Value = styled.p`
  font-size: 16px;
`;

const MyInfo = (props) => {
  const { avatar, setAvatar, username, email } = props;

  const setProfileAvatar = useSetRecoilState(profileAvatarAtom);

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

  const fileInputRef = useRef(null);

  const handleFileChange = async () => {
    const accessToken = localStorage.getItem("accessToken");
    let user = JSON.parse(localStorage.getItem("user"));
    const _id = user.id;

    const file = fileInputRef.current.files[0];
    if (!file) return;
    try {
      const response = await api.getPresignedURL();
      const { URL } = response.data;
      await api.uploadToS3(URL, file);
      const imageURL = URL.split("?")[0];

      const updated = { _id, imageURL };
      const result = await api.updateAvatar(updated, accessToken);
      if (result.status === 200) {
        user.avatar = imageURL;
        localStorage.setItem("user", JSON.stringify(user));
        setAvatar(imageURL);
        setProfileAvatar(imageURL);
        successNotify("Avatar updated!");
      }
    } catch (e) {
      console.log(e);
      errorNotify("Failed to update your avatar, please try again later.");
    }
  };

  return (
    <Wrapper>
      <Top>
        <AvatarWrapper>
          <Avatar src={avatar !== "" ? avatar : member} alt="avatar" />
          <Upload>
            <Image id="file" ref={fileInputRef} onChange={handleFileChange} />
            <UploadIcon htmlFor="file" />
          </Upload>
        </AvatarWrapper>
        <Name>{username}</Name>
      </Top>
      <InfoRow>
        <Label>Email</Label>
        <Value>{email}</Value>
      </InfoRow>
    </Wrapper>
  );
};

export default MyInfo;
