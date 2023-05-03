import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../../recoil/atoms";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components/macro";

import logo from "./logo2.png";
import member from "./member.svg";

import api from "../../utils/api";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100px;
  width: 100%;
  padding: 0 4%;
  background: #63895f;
  box-shadow: 0 1px 10px rgb(184, 223, 173, 0.4);
`;

const Logo = styled(Link)`
  position: relative;
  width: 250px;
  height: 50px;
  margin-right: 50px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      animation: underline 0.3s ease forwards;
      box-shadow: -25px 25px 500px 40px rgb(0, 230, 0, 0.5);
    }
  }

  @keyframes underline {
    from {
      width: 0;
    }
    to {
      width: 70%;
    }
  }
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CategoryLinks = styled.div``;

const CategoryLink = styled.a`
  position: relative;
  margin-right: 20px;
  font-size: 20px;
  letter-spacing: 2px;
  color: white;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    &::after {
      content: "";
      padding-left: 10px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -7px;
      height: 0.5px;
      background-color: #d9b99a;
      animation: underline 0.3s ease forwards;
      box-shadow: 0 1px 5px 1px rgba(255, 255, 255, 0.8);
    }
  }

  @keyframes underline {
    from {
      width: 0;
    }
    to {
      width: 90%;
    }
  }
`;

const ProfileAvatar = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  box-shadow: 0px 0px 3px 2px #d9b99a;
  transition: box-shadow 0.1s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 10px 5px #d9b99a;
    cursor: pointer;
  }
`;

const categories = [
  {
    name: "community",
    displayText: "Community",
  },
  {
    name: "chat",
    displayText: "Chat",
  },
  {
    name: "Anonymous",
    displayText: "Anonymous",
  },
];

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const [inputValue, setInputValue] = useState("");
  const category = searchParams.get("category");
  const [profileAvatar, setProfileAvatar] = useState("");

  const errorNotify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 1500,
      onClose: () => {
        navigate("/login");
      },
    });
  };

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);
  console.log(isLoggedIn);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const renderAvatar = async (accessToken) => {
      try {
        const response = await api.getProfile(accessToken);
        if (response.status === 200) {
          const profileAvatar = response.data.avatar;
          setProfileAvatar(profileAvatar);
        }
      } catch (e) {
        localStorage.clear();
        setProfileAvatar("");
        return;
      }
    };
    renderAvatar(accessToken);
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <ToastContainer />
      <Logo to="/" />
      <Navbar>
        <CategoryLinks>
          {categories.map(({ name, displayText }, index) => (
            <CategoryLink
              $isActive={category === name}
              key={index}
              onClick={() => {
                if (!isLoggedIn) {
                  errorNotify("Please log in to continue.");
                  return;
                }
                navigate(name);
              }}
            >
              {displayText}
            </CategoryLink>
          ))}
        </CategoryLinks>
        <ProfileAvatar
          src={profileAvatar !== "" ? profileAvatar : member}
          onClick={() => {
            if (!isLoggedIn) {
              errorNotify("Please log in to continue.");
              return;
            }
            navigate("./profile");
          }}
          alt="avatar"
        />
      </Navbar>
    </Wrapper>
  );
}

export default Header;
