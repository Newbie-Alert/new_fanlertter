import styled from "styled-components";

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


export {
  InputContainer,
  InputForm,
  InputSelect,
  InputOptions,
  InputWrapper,
  TextBox,
  InputEl,
  InputTextArea,
  SubmitBtn,
  BackDrop,
  BackDropText,
}