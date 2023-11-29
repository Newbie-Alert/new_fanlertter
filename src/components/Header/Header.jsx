import React from "react";
import { useNavigate } from "react-router";
import * as St from "./styles.js";

export default function Header() {
  const navi = useNavigate();

  const toHome = () => {
    navi("/");
  };

  return (
    <St.HeaderContainer>
      <St.HeaderTitle onClick={toHome}>NewJeans Fanletter</St.HeaderTitle>
      <St.HeaderBox>
        <St.HeaderRegisterBtn>Login</St.HeaderRegisterBtn>
      </St.HeaderBox>
    </St.HeaderContainer>
  );
}
