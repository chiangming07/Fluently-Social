import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";
import notFound from "../NotFound/notFound.png";

import LanguageFlag from "../../components/LanguageFlag/LanguageFlag";
import TabContainer from "./components/TabContainer";
import Loading from "./components/Loading";

import api from "../../utils/api";

const Wrapper = styled.div`
  height: 100vh;
  background-size: 50px 50px;
  background-image: linear-gradient(to right, #e9e6e68f 0.5px, transparent 2px),
    linear-gradient(to bottom, #e9e6e68f 0.5px, transparent 2px);
  overflow: auto;
`;
const Title = styled.h2`
  font-family: "Cabin Sketch", cursive;
  font-size: 3em;
  padding-left: 1.5%;
`;

const Image = styled.img`
  display: block;
  width: 30%;
  margin: 0 auto;
`;
const UserArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 95%;
  max-width: 1900px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 21%;
  height: 35vh;
  margin: 0 2% 3% 2%;
  background-color: rgb(236, 244, 232);
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
  padding: 1%;
  transform-style: preserve-3d;
  transition: transform 800ms ease 0.1s;
  box-shadow: 0px 0px 20px 1px #d5d5d5ee;
  &:hover {
    transform: rotateY(180deg);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 90%;
    right: 10;
    width: 12%;
    height: 25%;
    background-color: #ebe1b1de;
    transform: rotate(94deg);
    z-index: 1;
  }
  &:hover::before {
    opacity: 0;
  }
`;

const Back = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 35vh;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 36%;
  margin: 0 auto;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Avatar = styled.img`
  width: 100%;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const Online = styled.div`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 4px solid rgb(236, 244, 232);
  background-color: ${(props) => (props.online ? "green" : "gray")};
`;

const UserName = styled.h2`
  font-size: 20px;
  margin: 4% 0;
  text-align: center;
`;

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
  box-shadow: 0px 1px 3px 0px;
  color: rgb(34, 101, 78);
  padding: 5px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.05rem;
`;

const Front = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  height: 30vh;
  width: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  transform: rotateY(180deg);
`;

const TopicArea = styled.div`
  padding: 0 16px;
`;
const Topic = styled.div`
  display: inline-flex;
  flex-grow: 1;
  padding: 10px;
  margin: 1%;
  background-color: #e5ecadca;
  border-radius: 8px;
  color: rgb(34, 101, 78);
  font-size: 16px;
`;

const Button = styled.div`
  align-self: center;
  position: relative;
  padding: 6%;
  margin-left: 5vw;
  background-color: #e5ecadca;
  color: ghostwhite;
  outline: none;
  letter-spacing: 0.05rem;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  span {
    display: inline-block;
    width: 100%;
    position: relative;
    z-index: 10;
    color: ghostwhite;
    text-align: center;
    transition: color 0.4s;
  }

  &:hover span {
    color: rgb(34, 101, 78);
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
    background: rgb(99, 137, 95);
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
  const [isNearMe, setIsNearMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    const renderCommunity = async () => {
      try {
        setIsLoading(true);
        setIsFetchingLocation(false);
        const user = localStorage.getItem("user");
        const { id, speaking, learning, topic } = user ? JSON.parse(user) : {};
        setMyId(id);
        const data = user
          ? { userId: id, speaking, learning, topic }
          : { speaking: [], learning: [], topic: [] };

        if (isNearMe) {
          setIsFetchingLocation(true);
          const position = await new Promise((success, error) => {
            navigator.geolocation.getCurrentPosition(success, error);
          });
          if (!position) return;
          const { latitude, longitude } = position.coords;
          const nearbyUsers = await api.fetchNearbyUsers({
            userId: id,
            latitude,
            longitude,
          });
          setUsers(nearbyUsers.data.nearbyUsersData);
          setIsLoading(false);
          return;
        }
        const response = await api.fetchAllUsers(data);
        const users = response.data;
        setUsers(users);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response.data.message);
        setIsLoading(false);
        return;
      }
    };

    renderCommunity();
  }, [isNearMe]);

  const handleStartChat = async (partnerId) => {
    const data = { myId, partnerId };
    const response = await api.getRoomId(data);
    const roomId = response.data.roomId;
    navigate(`/chat/${roomId}`);
  };

  return (
    <Wrapper>
      <TabContainer isNearMe={isNearMe} setIsNearMe={setIsNearMe} />
      <UserArea>
        {isLoading && !isFetchingLocation && <Loading msg={"Loading"} />}
        {isLoading && isFetchingLocation && (
          <Loading msg={"Updating location"} />
        )}
        {!isLoading && (
          <>
            {users.length === 0 && (
              <>
                <Title>Sorry, no other users found.</Title>
                <Image src={notFound} />
              </>
            )}
            {users.length > 0 && (
              <>
                {users.map((user) => (
                  <User key={user._id}>
                    <Back>
                      <AvatarContainer>
                        <AvatarWrapper>
                          <Avatar src={user.avatar} alt="user avatar" />
                          <Online online={user.online} />
                        </AvatarWrapper>
                      </AvatarContainer>
                      <UserName>{user.username}</UserName>
                      <Row>
                        <Left>
                          <Category>Speaking</Category>
                        </Left>
                        <Right>
                          {user.speaking.map((item) => (
                            <LanguageFlag
                              key={item._id}
                              language={item.language}
                            />
                          ))}
                        </Right>
                      </Row>
                      <Row>
                        <Left>
                          <Category>Learning</Category>
                        </Left>
                        <Right>
                          {user.learning.map((item) => (
                            <LanguageFlag
                              key={item._id}
                              language={item.language}
                            />
                          ))}
                        </Right>
                      </Row>
                    </Back>

                    <Front>
                      <TopicArea>
                        {user.topic.length === 0 ? (
                          <Topic>🌱 Not specified</Topic>
                        ) : (
                          user.topic.map((item) => (
                            <Topic key={item}>🌱 {item}</Topic>
                          ))
                        )}
                      </TopicArea>

                      <Button
                        onClick={() => {
                          const partnerId = user._id;
                          if (!myId) {
                            toast.warn(
                              "Chatting is only available to registered members. Join us now!",
                              {
                                position: "top-center",
                                style: {
                                  top: "100px",
                                },
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
                    </Front>
                  </User>
                ))}
              </>
            )}
          </>
        )}
      </UserArea>
    </Wrapper>
  );
};

export default Community;
