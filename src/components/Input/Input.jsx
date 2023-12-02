import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { __getMessages } from "../../shared/redux/modules/messages";
import messageAPI from "../../axios/messageAPI";

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 1rem 3rem;
  position: relative;
`;

const InputForm = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1rem;
`;

const InputSelect = styled.select`
  width: 160px;
  padding: 0.3rem 0.3rem;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: #eee;
`;

const InputOptions = styled.option`
  width: 160px;
  padding: 0.3rem 0.3rem;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: #eee;
`;

const InputWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputEl = styled.input.attrs((props) => ({
  readOnly: props.$nickname === "nickname" && true,
  required: true,
}))`
  width: 160px;
  padding: 0.3rem 0.3rem;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: #eee;
  display: inline-block;
`;

const InputTextArea = styled.textarea.attrs((props) => ({
  rows: "9",
  cols: "100",
  placeholder: "메세지를 입력해주세요 (100글자 제한)",
  maxLength: 100,
  required: true,
}))`
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: #eee;
`;

const SubmitBtn = styled.button.attrs((props) => ({
  type: "submit",
}))`
  width: 120px;
  padding: 0.6rem 0.6rem;
  border-radius: 6px;
  background: #eee;
  color: #1f1f1f;
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #147ce4;
    color: #ffffff;
  }
`;

const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff50;
`;

const BackDropText = styled.h3`
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 2rem;
  font-weight: 500;
`;

export default function Input() {
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLogined(JSON.parse(localStorage.getItem("user")));
    setTask({
      ...task,
      name: JSON.parse(localStorage.getItem("user"))?.nickname,
      uid: JSON.parse(localStorage.getItem("user"))?.userId,
    });
  }, [user]);

  // STATES
  const [task, setTask] = useState({
    id: uuid(),
    sendTo: "민지",
    name: isLogined?.nickname,
    message: "",
    createdAt: new Date().getTime(),
    uid: "",
  });

  // Functions
  const postData = async () => {
    await messageAPI.post("/messages", task);
    try {
      alert("게시물 등록이 완료되었습니다.");
      dispatch(__getMessages());
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "sendTo":
        setTask({ ...task, sendTo: target.value });
        break;
      case "message":
        setTask({ ...task, message: target.value });
        break;
      default:
        return target.value;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTask((prev) => ({
      ...prev,
      id: uuid(),
      name: isLogined?.nickname,
      sendTo: "민지",
      message: "",
      createdAt: new Date().getTime(),
    }));
    postData();
  };

  // Variables
  const members = ["민지", "혜인", "하니", "혜린", "다니엘"];

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <TextBox>
          To.
          <InputSelect
            onChange={handleChange}
            name="sendTo"
            value={task.sendTo}>
            {members.map((member) => {
              return <InputOptions key={member}>{member}</InputOptions>;
            })}
          </InputSelect>
          <InputWrapper>
            Name
            <InputEl
              onChange={handleChange}
              name="name"
              $nickname={"nickname"}
              value={isLogined?.nickname}
            />
          </InputWrapper>
          <InputWrapper>
            Message
            <InputTextArea
              onChange={handleChange}
              name="message"
              value={task.message}
            />
          </InputWrapper>
        </TextBox>
        <SubmitBtn>메세지 보내기</SubmitBtn>
      </InputForm>
      {isLogined === null && (
        <BackDrop>
          <BackDropText>로그인 후 이용 가능합니다.</BackDropText>
        </BackDrop>
      )}
    </InputContainer>
  );
}
