import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import logo from "./logo2.png";
// import search from "./search.png";
// 要把用戶的照片傳進來
import avatar from "./cat.PNG";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100px;
  width: 100%;
  padding: 0 60px 0 60px;
  background: rgb(99, 137, 95);
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
  &:hover {
    cursor: pointer;
    text-decoration: none;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      border-radius: 4px;
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
  padding-left: 20px;
  padding-right: 10px;
  font-size: 20px;
  letter-spacing: 2px;
  color: white;
  /* &:hover {
    box-shadow: 0 0 20px 5px #d9b99a;
    background: rgb(248, 242, 237, 0.3);
    border-radius: 10px;
    cursor: pointer;
  } */
  &:hover {
    cursor: pointer;
    text-decoration: none;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -7px;
      width: 30%;
      height: 0.5px;
      background-color: #d9b99a;
      border-radius: 4px;
      animation: underline 0.3s ease forwards;
      box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.8);
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

const Profile = styled.div``;

const ProfileLink = styled(Link)``;

const Avatar = styled.div`
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

const ProfileIcon = styled(Avatar)`
  background-image: url(${avatar});
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
    // name: "notes",
    // displayText: "筆記",
    name: "nearme",
    displayText: "Nearme",
  },
];

function Header() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);

  return (
    <Wrapper>
      <Logo to="/" />
      <Navbar>
        <CategoryLinks>
          {categories.map(({ name, displayText }, index) => (
            <CategoryLink
              $isActive={category === name}
              key={index}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                navigate(name);
              }}
            >
              {displayText}
            </CategoryLink>
          ))}
        </CategoryLinks>
        {/* <SearchInput
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            navigate(`/?keyword=${inputValue}`);
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      /> */}
        <Profile>
          <ProfileLink to="/profile">
            <ProfileIcon icon={avatar}></ProfileIcon>
          </ProfileLink>
        </Profile>
      </Navbar>
    </Wrapper>
  );
}

export default Header;
