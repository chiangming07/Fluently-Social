import styled from "styled-components/macro";

import member from "./member.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 79vh;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-left: 24px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 5px solid rgba(201, 207, 203, 0.52);
  }
`;

const Avatar = styled.img`
  width: 120px;
  margin-right: 48px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const Label = styled.label`
  width: 50%;
  font-size: 16px;
  font-weight: bold;
`;

const Value = styled.p`
  width: 50%;
  /* margin-left: 24px; */
  font-size: 16px;
`;

const MyInfo = (props) => {
  const { avatar, username, email, gender, age } = props;

  return (
    <Wrapper>
      <AvatarWrapper>
        <Avatar src={avatar !== "" ? avatar : member} alt="avatar" />
        <Name>{username}</Name>
      </AvatarWrapper>
      <InfoWrapper>
        {/* <InfoRow>
          <Label>Full Name</Label>
          <Value>User's Full Name</Value>
        </InfoRow> */}
        <InfoRow>
          <Label>Email</Label>
          <Value>{email}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Gender</Label>
          <Value>{gender || "Not specified"}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Age</Label>
          <Value>{age || "Not specified"}</Value>
        </InfoRow>
      </InfoWrapper>
    </Wrapper>
  );
};

export default MyInfo;
