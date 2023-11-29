import React, { useState } from "react";
import styled from "styled-components";
import { FadeAnimation } from "../../components/Banner/styles";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { editMsg } from "../../shared/redux/modules/messages";

const DetailContainer = styled.div`
  width: 100%;
  padding-top: 4.1rem;
  animation: ${FadeAnimation} 0.4s forwards;
`;

const DetailBox = styled.div`
  width: 100%;
  border-radius: 6px;
  max-width: 800px;
  margin: auto;
  margin-top: 5rem;
  border: 1px solid black;
  font-weight: 600;
`;

const DetailTitle = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #1d1d1d;
`;

const DetailTime = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #1d1d1d;
`;

const DetailContent = styled.div`
  width: 100%;
  padding: 1rem;
  height: 300px;
  font-weight: 500;
`;

const DetailButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid #1d1d1d;
`;

const DetailButtons = styled.button.attrs((props) => ({
  type: "button",
}))`
  width: 120px;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  border: none;
  font-size: 0.9rem;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) =>
      props.$role === "delete" ? "#fa334d" : "#528eff"};
    color: white;
  }
`;

const EditArea = styled.textarea.attrs((props) => ({
  placeholder: `${props.$curMsg}`,
}))`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: black;
  background-color: #eee;
`;

export default function Detail() {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  const reduxMsg = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const { id } = useParams();

  const found = reduxMsg.find((msg) => msg.id === id);

  const openModal = () => {
    setModal(true);
  };

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setNewMsg(e.target.value);
  };

  const editData = () => {
    if (newMsg.length === 0) {
      alert("변경 사항이 없습니다");
    } else {
      dispatch(editMsg({ id, newMsg }));
      alert("수정이 완료되었습니다");
      handleEdit();
    }
    setIsEdit(false);
  };

  return (
    <>
      <DetailContainer>
        <DetailBox>
          <DetailTitle>To. {found.sendTo}</DetailTitle>
          <DetailTime>From. {found.name}</DetailTime>
          {isEdit ? (
            <DetailContent>
              <EditArea
                onChange={handleChange}
                value={newMsg}
                $curMsg={found.message}></EditArea>
            </DetailContent>
          ) : (
            <DetailContent>{found.message}</DetailContent>
          )}
          <DetailButtonBox>
            {isEdit ? (
              <DetailButtons $role={"edit"} onClick={(e) => editData(e)}>
                수정하기
              </DetailButtons>
            ) : (
              <DetailButtons $role={"delete"} onClick={openModal}>
                삭제
              </DetailButtons>
            )}
            {isEdit ? (
              <DetailButtons onClick={handleEdit}>취소</DetailButtons>
            ) : (
              <DetailButtons onClick={handleEdit}>수정</DetailButtons>
            )}
          </DetailButtonBox>
        </DetailBox>
      </DetailContainer>
      {modal ? <Modal setModal={setModal} id={id} /> : null}
    </>
  );
}
