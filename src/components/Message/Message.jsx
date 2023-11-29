import React, { useState } from "react";
import styled, { css } from "styled-components";
import MessageGrid from "../MessageGrid/MessageGrid";

const MessageContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  /* display: grid;
  grid-template-columns: repeat(6, 1fr); */
`;

const MessageHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageTitle = styled.h3`
  width: fit-content;
  font-weight: 600;
  font-size: 2rem;
`;

const MessageFilterBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MessageFilterBtn = styled.div`
  width: 75px;
  padding: 0.6rem 0.1rem;
  border-radius: 6px;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        background-color: #9595ff;
      `;
    } else {
      return css`
        background-color: #eee;
      `;
    }
  }}
  color: #1f1f1f;
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  text-align: center;

  &:hover {
    background: #147ce4;
    color: #ffffff;
  }
`;

export default function Message() {
  const members = ["전체", "민지", "혜인", "하니", "다니엘", "혜린"];

  const [curMember, setCurMemeber] = useState("전체");

  const handleCurMember = (e) => {
    setCurMemeber(e.target.innerText);
  };

  return (
    <MessageContainer>
      <MessageHeader>
        <MessageTitle>Messages</MessageTitle>
        <MessageFilterBtnBox>
          {members.map((member, index) => {
            return (
              <MessageFilterBtn
                onClick={handleCurMember}
                $current={curMember}
                key={index}>
                {member}
              </MessageFilterBtn>
            );
          })}
        </MessageFilterBtnBox>
      </MessageHeader>
      <MessageGrid curMember={curMember} />
    </MessageContainer>
  );
}
