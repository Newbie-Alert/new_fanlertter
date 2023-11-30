import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as St from "./styles.js";
import { useSelector } from "react-redux";

export default function Header() {
  const navi = useNavigate();
  const [isUser, setIsUser] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    localStorage.getItem("user") !== null && setIsLogined(true);
    localStorage.getItem("user") !== null &&
      setIsUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  const naviTo = (path) => {
    navi(path);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setIsLogined(false);
    setIsUser([]);
  };

  return (
    <St.HeaderContainer>
      <St.HeaderTitle onClick={() => naviTo("/")}>
        NewJeans Fanletter
      </St.HeaderTitle>
      <St.HeaderBox>
        {isLogined && (
          <St.HeaderRegisterBtn onClick={logOut}>logout</St.HeaderRegisterBtn>
        )}
        {isUser.length === 0 ? (
          <St.HeaderRegisterBtn onClick={() => naviTo("/login")}>
            Login
          </St.HeaderRegisterBtn>
        ) : (
          <St.HeaderRegisterBtn onClick={() => naviTo(`/my/${isUser?.userId}`)}>
            My Page
          </St.HeaderRegisterBtn>
        )}
      </St.HeaderBox>
    </St.HeaderContainer>
  );
}
