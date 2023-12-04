import styled from "styled-components";
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const LoginPageBody = styled.div`
  padding-top: 4.1rem;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: fit-content;
  min-height: 350px;
  padding: 3rem 2rem;
  border-radius: 6px;
  margin: auto;
  border: 1px solid black;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoginTitle = styled.div`
  width: 100%;
  font-size: 1.65rem;
  font-weight: 600;
  text-align: center;
`;

const LoginInputBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.65rem;
  margin-block: 1rem;

  & input {
    width: 100%;
    padding: 0.5rem 0;
    font-weight: 600;
    outline: none;
    border: none;
    border-bottom: 2px solid #eee;
  }
`;

const LoginInput = styled.input.attrs((props) => ({
  type: props.$role === "id" ? "text" : "password",
  maxLength: props.$role === "id" ? 10 : 15,
  minLength: props.$role === "password" ? 4 : 4,
  placeholder:
    props.$role === "id"
      ? "아이디를 입력하세요 (4 ~ 10 글자)"
      : "패스워드를 입력하세요 (4 ~ 15 글자)",
  required: true,
}))``;

const SignUpInput = styled.input.attrs((props) => ({
  type: "text",
  minLength: 1,
  maxLength: 10,
  placeholder: "닉네임을 입력하세요 (1 ~ 10 글자)",
  required: true,
}))`
  width: 100%;
  border-bottom: 2px solid #1d1d1d;
`;

const LoginButton = styled.button.attrs((props) => ({
  type: props.$to === "login" ? "submit" : "button",
  disabled: props.$isPass ? false : true,
}))`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => (props.$isPass ? "#9bafff" : "#eee")};
  color: #1d1d1d;
  font-weight: 600;
  cursor: ${(props) => (props.$isPass ? "pointer" : "not-allowed")};

  &:hover {
    background: ${(props) => (props.$isPass ? "#142e9bff" : "#eee")};
    color: ${(props) => (props.$isPass ? "white" : "#1d1d1d")};
  }
`;

export {
  LoginPageBody,
  LoginContainer,
  LoginTitle,
  LoginInputBox,
  LoginInput,
  SignUpInput,
  LoginButton,
}