import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeMsg } from "../../shared/redux/modules/messages";

// STYLED COMPONENT
const ModalBackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContainer = styled.div`
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid #1f1f1f;
  border-radius: 9px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
`;

const ConfirmButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  width: 90px;
  padding: 0.3rem 0;
  border-radius: 6px;
  outline: none;
  border: 1px solid #454545;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$role === "delete" ? `red` : `green`};
    color: white;
  }
`;

// MAIN COMPONENT
export default function Modal({ id, setModal }) {
  // REDUX_DISPATCH
  const dispatch = useDispatch();

  // HOOKS
  const navi = useNavigate();

  // FUNCTIONS
  const closeModal = () => {
    setModal(false);
  };

  const deleteMessage = (id) => {
    dispatch(removeMsg(id));
    navi("/");
  };

  // MAIN RETURN
  return (
    <>
      <ModalContainer>
        <h4>메세지를 삭제하시겠습니까?</h4>
        <ConfirmButtonBox>
          <Button
            id={id}
            onClick={(e) => {
              deleteMessage(e.target.id);
            }}
            $role="delete">
            삭제
          </Button>
          <Button onClick={closeModal} $role="edit">
            취소
          </Button>
        </ConfirmButtonBox>
      </ModalContainer>
      <ModalBackDrop></ModalBackDrop>
    </>
  );
}
