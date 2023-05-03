import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";
import LanguageFlag from "../../components/LanguageFlag/LanguageFlag";

import api from "../../utils/api";

const Wrapper = styled.div`
  height: 100vh;
  background-size: 50px 50px;
  background-image: linear-gradient(to right, #e9e6e68f 0.5px, transparent 2px),
    linear-gradient(to bottom, #e9e6e68f 0.5px, transparent 2px);
  overflow: auto;
`;

const UserArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 95%;
  margin-top: 150px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 23%;
  height: 50vh;
  margin-bottom: 2%;
  background-color: #f3f8ed;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
  padding: 20px;
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 8px 50px #23232333;
    transform: translateY(3%);
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 100px;
  min-height: 100px;
`;
const Avatar = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 50%;
`;

const Online = styled.div`
  position: absolute;
  bottom: 5px;
  right: -15px;
  transform: translateX(-50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 4px solid white;
  background-color: ${(props) => (props.online ? "green" : "gray")};
`;

const UserName = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;

const Detail = styled.div``;

const Row = styled.div`
  display: flex;
  margin: 2px;
`;
const Left = styled.div`
  margin: 5px 5px;
  width: 35%;
  display: flex;
  line-height: 30px;
`;
const Right = styled.div`
  margin-left: 10px;
  min-width: 140px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
    padding: 5px;
  }
`;
const Category = styled.span`
  background-color: #deeb93b0;
  padding: 5px;
  border-radius: 4px;
`;

// const Topic = styled.div`
//   margin: 5px 0;
// `;

const Button = styled.button`
  display: inline-block;
  position: relative;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  background: #bceca9;
  outline: none;
  color: ghostwhite;
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
  }

  &:hover span {
    color: black;
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &::before {
    content: "";
    background: #80b77b;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.2s cubic-bezier(0.3, 1, 0.8, 1);
  }

  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }
`;
const Community = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    const renderCommunity = async () => {
      try {
        let user = localStorage.getItem("user");
        let speaking;
        let learning;
        if (user) {
          user = JSON.parse(user);
          speaking = user.speaking;
          learning = user.learning;
          setMyId(user.id);
        }
        const data = { speaking, learning };
        const response = await api.queryAllUsers(data);
        const users = response.data;
        setUsers(users);
      } catch (e) {
        console.log(e.response.data.message);
        return;
      }
    };

    renderCommunity();
  }, []);

  const handleStartChat = async (partnerId) => {
    const data = { myId, partnerId };
    const response = await api.getRoomId(data);
    const roomId = response.data.roomId;
    navigate(`/chat/${roomId}`);
  };

  return (
    <Wrapper>
      <ToastContainer />
      <UserArea>
        {users.map((user) => (
          <User key={user._id}>
            <AvatarContainer>
              <Avatar src={user.avatar} alt="user avatar" />
              <Online online={user.online} />
            </AvatarContainer>
            <UserName>{user.username}</UserName>
            <Detail>
              <Row>
                <Left>
                  <Category>Speaking</Category>
                </Left>
                <Right>
                  {user.speaking.map((item) => (
                    <LanguageFlag
                      key={item.language}
                      language={item.language}
                    />
                  ))}
                  {/* Level:
            {user.speaking.map((item) => (
              <span>{item.level}</span>
            ))} */}
                </Right>
              </Row>
              <Row>
                <Left>
                  <Category>Learning</Category>
                </Left>
                <Right>
                  {user.learning.map((item) => (
                    <LanguageFlag
                      key={item.language}
                      language={item.language}
                    />
                  ))}
                  {/* Level:
            {user.learning.map((item) => (
              <span>{item.level}</span>
            ))} */}
                </Right>
              </Row>
              {/*
              
              <Row>
                <Left>
                  <Category> Topic</Category>
                </Left>
                <Right>
                  {user.topic.map((item) => (
                    <span> {item}</span>
                  ))}
                </Right>
              </Row> */}
              {/* <Topic>
              <Category> Topic</Category>
              {user.topic.map((item) => (
                <span> {item}</span>
              ))}
            </Topic> */}
            </Detail>

            <Button
              onClick={() => {
                const partnerId = user._id;
                if (!myId) {
                  toast.warn(
                    "Chatting is only available to registered members. Join us now!",
                    {
                      position: "top-center",
                      autoClose: 1500,
                      onClose: () => {
                        navigate("/login");
                      },
                    }
                  );
                }
                handleStartChat(partnerId);
              }}
            >
              <span>Start Chatting</span>
            </Button>
          </User>
        ))}
      </UserArea>
    </Wrapper>
  );
};

export default Community;
