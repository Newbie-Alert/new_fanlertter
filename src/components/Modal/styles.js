import styled from "styled-components";


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

export {
  ModalBackDrop,
  ModalContainer,
  ConfirmButtonBox,
  Button,
}