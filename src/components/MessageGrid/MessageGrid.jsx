import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as St from "./styles";
import { __getMessages } from "../../shared/redux/modules/messages";

export default function MessageGrid({ curMember }) {
  // States
  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMessages());
  }, []);

  // Hooks
  const navi = useNavigate();

  // Variables
  const filteredData =
    curMember === "전체"
      ? messages
      : messages?.filter((msg) => msg.sendTo === curMember);

  return (
    <St.MessageGridContainer>
      {filteredData?.map((msg) => {
        return (
          <St.MessageBox
            onClick={() => navi(`/detail/${msg.id}`)}
            id={msg.id}
            key={msg.id}>
            <St.MessageTo>
              <span>To.</span> {msg.sendTo}
            </St.MessageTo>
            <St.MessageName>
              <span>from.</span> {msg.name}
            </St.MessageName>
            <St.MessageContentBox>
              <St.MessageContent>{msg.message}</St.MessageContent>
            </St.MessageContentBox>
          </St.MessageBox>
        );
      })}
    </St.MessageGridContainer>
  );
}
