import React, { useEffect, useState } from "react";
import * as St from "./styles";
import MessageGrid from "../MessageGrid/MessageGrid";
import { useSelector } from "react-redux";

export default function Message() {
  const members = ["전체", "민지", "혜인", "하니", "다니엘", "혜린"];

  const [curMember, setCurMemeber] = useState("전체");
  const [isLogined, setIsLogined] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [user]);

  const handleCurMember = (e) => {
    setCurMemeber(e.target.innerText);
  };

  if (isLogined === false) {
    return (
      <St.NotLogined>
        <h1>로그인 후 메세지를 보세요!</h1>
      </St.NotLogined>
    );
  }
  return (
    <St.MessageContainer>
      <St.MessageHeader>
        <St.MessageTitle>Messages</St.MessageTitle>
        <St.MessageFilterBtnBox>
          {members.map((member, index) => {
            return (
              <St.MessageFilterBtn
                onClick={handleCurMember}
                $current={curMember}
                key={index}>
                {member}
              </St.MessageFilterBtn>
            );
          })}
        </St.MessageFilterBtnBox>
      </St.MessageHeader>
      <MessageGrid curMember={curMember} />
    </St.MessageContainer>
  );
}
