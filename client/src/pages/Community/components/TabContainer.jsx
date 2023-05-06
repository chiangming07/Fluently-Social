import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { toast } from "react-toastify";

import styled from "styled-components/macro";
import { isLoggedInAtom } from "../../../recoil/atoms";

const Container = styled.div`
  display: flex;
  width: 95%;
  padding-right: 40px;
  margin: 120px 0 50px 60px;
`;

const TabButton = styled.button`
  padding: 15px 30px;
  margin-right: 10px;
  border: none;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  color: ${({ active }) => (active ? "#5b9f59" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  box-shadow: ${({ active }) =>
    active ? "0 0 5px rgba(0, 0, 0, 0.2), inset 5px 0 #7cc096" : ""};
  font-size: 16px;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #5b9f59ce;
  }
`;

const TabContainer = (props) => {
  const { isNearMe, setIsNearMe } = props;

  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const errorNotify = (msg) => {
    if (isAlertShown) {
      return;
    }

    setIsAlertShown(true);
    toast.error(msg, {
      position: "top-center",
      style: {
        top: "100px",
      },
      autoClose: 1500,
      onClose: () => {
        setIsAlertShown(false);
        navigate("/login");
      },
    });
  };

  return (
    <Container>
      <TabButton
        active={!isNearMe}
        onClick={() => {
          setIsNearMe(false);
          navigate("/community");
        }}
      >
        All MEMBERS
      </TabButton>
      <TabButton
        active={isNearMe}
        onClick={() => {
          if (!isLoggedIn) {
            errorNotify("Please log in to continue.");
            return;
          }
          setIsNearMe(true);
          navigate("/community/nearme");
        }}
      >
        NEAR ME
      </TabButton>
    </Container>
  );
};

export default TabContainer;
