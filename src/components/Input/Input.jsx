import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "./styles";
import { v4 as uuid } from "uuid";
import { __getMessages } from "../../shared/redux/modules/messages";
import messageAPI from "../../axios/messageAPI";

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
    <St.InputContainer>
      <St.InputForm onSubmit={handleSubmit}>
        <St.TextBox>
          To.
          <St.InputSelect
            onChange={handleChange}
            name="sendTo"
            value={task.sendTo}>
            {members.map((member) => {
              return <St.InputOptions key={member}>{member}</St.InputOptions>;
            })}
          </St.InputSelect>
          <St.InputWrapper>
            Name
            <St.InputEl
              onChange={handleChange}
              name="name"
              $nickname={"nickname"}
              value={isLogined?.nickname}
            />
          </St.InputWrapper>
          <St.InputWrapper>
            Message
            <St.InputTextArea
              onChange={handleChange}
              name="message"
              value={task.message}
            />
          </St.InputWrapper>
        </St.TextBox>
        <St.SubmitBtn>메세지 보내기</St.SubmitBtn>
      </St.InputForm>
      {isLogined === null && (
        <St.BackDrop>
          <St.BackDropText>로그인 후 이용 가능합니다.</St.BackDropText>
        </St.BackDrop>
      )}
    </St.InputContainer>
  );
}
