import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as St from "./styles.js";
import { useDispatch, useSelector } from "react-redux";
import {
  __fetchUserInfo,
  removeUser,
} from "../../shared/redux/modules/auth.js";
import { Toast } from "../../pages/Login/Login.jsx";

export default function Header() {
  const navi = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("user") !== null && setIsLogined(true);
    if (user !== null) {
      dispatch(__fetchUserInfo());
    }
  }, [isLogined, user]);

  const naviTo = (path) => {
    navi(path);
  };

  const naviToMypage = async () => {
    const userInfo = await JSON.parse(localStorage.getItem("info"));
    if (userInfo === null) {
      Toast.fire({
        title: "로그인 정보가 만료되었습니다",
        text: "로그인 페이지로 이동합니다",
        timer: "1500",
      }).then((value) => {
        value.isDismissed === true && navi("/login");
      });
    } else {
      navi(`/my/${userInfo.userId}`);
    }
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(removeUser());
    setIsLogined(false);
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
        {isLogined === false ? (
          <St.HeaderRegisterBtn onClick={() => naviTo("/login")}>
            Login
          </St.HeaderRegisterBtn>
        ) : (
          <St.HeaderRegisterBtn onClick={() => naviToMypage()}>
            My Page
          </St.HeaderRegisterBtn>
        )}
      </St.HeaderBox>
    </St.HeaderContainer>
  );
}
