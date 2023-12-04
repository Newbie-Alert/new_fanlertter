import React, { useEffect, useState } from "react";
import * as St from "./styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { __getMessages } from "../../shared/redux/modules/messages";
import messageAPI from "../../axios/messageAPI";
import { __fetchUserInfo } from "../../shared/redux/modules/auth";

export default function Detail() {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {}, []);

  const { messages } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const { id } = useParams();

  const found = messages?.find((msg) => msg.id === id);

  // FUNCTIONS
  const openModal = () => {
    setModal(true);
  };

  const handleEdit = () => {
    dispatch(__fetchUserInfo());
    setIsEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setNewMsg(e.target.value);
  };

  const editData = () => {
    if (newMsg.length === 0 || newMsg === "") {
      alert("변경 사항이 없습니다");
    } else {
      messageAPI.put(`/messages/${id}`, {
        ...found,
        message: newMsg,
      });
      alert("수정이 완료되었습니다");
      dispatch(__getMessages());
      handleEdit();
      setNewMsg(found.message);
    }
    setIsEdit(false);
  };

  return (
    <>
      <St.DetailContainer>
        <St.DetailBox>
          <St.DetailTitle>To. {found?.sendTo}</St.DetailTitle>
          <St.DetailTime>From. {found?.name}</St.DetailTime>
          {isEdit ? (
            <St.DetailContent>
              <St.EditArea
                onChange={handleChange}
                value={newMsg}
                $curMsg={found?.message}></St.EditArea>
            </St.DetailContent>
          ) : (
            <St.DetailContent>{found?.message}</St.DetailContent>
          )}
          {found.uid !==
          JSON.parse(localStorage.getItem("user"))?.userId ? null : (
            <St.DetailButtonBox>
              {isEdit ? (
                <St.DetailButtons $role={"edit"} onClick={(e) => editData(e)}>
                  수정하기
                </St.DetailButtons>
              ) : (
                <St.DetailButtons $role={"delete"} onClick={openModal}>
                  삭제
                </St.DetailButtons>
              )}
              {isEdit ? (
                <St.DetailButtons onClick={handleEdit}>취소</St.DetailButtons>
              ) : (
                <St.DetailButtons onClick={handleEdit}>수정</St.DetailButtons>
              )}
            </St.DetailButtonBox>
          )}
        </St.DetailBox>
      </St.DetailContainer>
      {modal ? <Modal setModal={setModal} found={found} /> : null}
    </>
  );
}
