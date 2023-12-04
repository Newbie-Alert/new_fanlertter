import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as St from "./styles";
import messageAPI from "../../axios/messageAPI";
import { useDispatch } from "react-redux";
import { __fetchUserInfo } from "../../shared/redux/modules/auth";

// MAIN COMPONENT
export default function Modal({ setModal, found }) {
  // HOOKS
  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(__fetchUserInfo(user?.accessToken));
  }, []);

  // FUNCTIONS
  const closeModal = () => {
    setModal(false);
  };

  const deleteMessage = () => {
    messageAPI.delete(`/messages/${found.id}`);
    navi("/");
  };

  // MAIN RETURN
  return (
    <>
      <St.ModalContainer>
        <h4>메세지를 삭제하시겠습니까?</h4>
        <St.ConfirmButtonBox>
          <St.Button
            id={found.id}
            onClick={(e) => {
              deleteMessage(e.target.id);
            }}
            $role="delete">
            삭제
          </St.Button>
          <St.Button onClick={closeModal} $role="edit">
            취소
          </St.Button>
        </St.ConfirmButtonBox>
      </St.ModalContainer>
      <St.ModalBackDrop></St.ModalBackDrop>
    </>
  );
}
