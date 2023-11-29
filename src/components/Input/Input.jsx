import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { addMsg } from "../../shared/redux/modules/messages";

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 1rem 3rem;
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
  // 유저 정보가 오면 그 닉네임을 담도록 하자.
  // placeholder:'이름을 입력하세요'
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

export default function Input() {
  // STATES
  const [sendTo, setSendTo] = useState("민지");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // HOOKS
  const dispatch = useDispatch();

  // FUNCTIONS
  const handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "sendTo":
        setSendTo(target.value);
        break;
      case "name":
        setName(target.value);
        break;
      case "message":
        setMessage(target.value);
        break;
      default:
        return target.value;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      id: uuid(),
      sendTo,
      name,
      message,
      createdAt: new Date().getTime(),
    };
    dispatch(addMsg(msg));
    setMessage("");
    setName("");
    setSendTo("민지");
  };

  // Variables
  const members = ["민지", "혜인", "하니", "혜린", "다니엘"];

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <TextBox>
          To.
          <InputSelect onChange={handleChange} name="sendTo" value={sendTo}>
            {members.map((member) => {
              return <InputOptions key={member}>{member}</InputOptions>;
            })}
          </InputSelect>
          <InputWrapper>
            Name
            <InputEl onChange={handleChange} name="name" value={name} />
          </InputWrapper>
          <InputWrapper>
            Message
            <InputTextArea
              onChange={handleChange}
              name="message"
              value={message}
            />
          </InputWrapper>
        </TextBox>
        <SubmitBtn>메세지 보내기</SubmitBtn>
      </InputForm>
    </InputContainer>
  );
}
