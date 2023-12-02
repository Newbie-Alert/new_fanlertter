import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authSignUp } from "../../axios/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { __doLogin, __doSignUp } from "../../shared/redux/modules/auth";
import { useNavigate } from "react-router";
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

export default function Login() {
  // STATES
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [postBody, setPostBody] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  // REDUX STATES
  const { user, isError, isLoading, error } = useSelector(
    (state) => state.auth
  );

  // HOOKS
  const dispatch = useDispatch();
  const navi = useNavigate();

  // Functions
  const naviTo = (path) => {
    navi(path);
  };

  const handleChange = (e) => {
    // Validate Input by length
    const { id, password, nickname } = postBody;
    if (id.length > 4 && id.length <= 10) {
      if (password.length > 4 && password.length <= 10) {
        if (nickname.length > 0 && nickname.length <= 10) {
          setIsPassed(true);
        }
      }
    } else {
      setIsPassed(false);
    }
    if (id.length === 0 || password.length === 0 || nickname.length === 0) {
      setIsPassed(false);
    }

    // set Input by name
    const { target } = e;
    switch (target.name) {
      case "id":
        setPostBody({ ...postBody, id: target.value });
        break;
      case "password":
        setPostBody({ ...postBody, password: target.value });
        break;
      case "nickname":
        setPostBody({ ...postBody, nickname: target.value });
        break;
      default:
        return postBody;
    }
  };

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const doSignUp = () => {
    try {
      dispatch(__doSignUp(postBody));
      if (isError === false) {
        Toast.fire({
          icon: "success",
          title: "회원가입 완료",
        });
        setIsSignUp(false);
        setPostBody((prev) => ({
          ...prev,
          id: "",
          password: "",
          nickname: "",
        }));
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: error?.message,
        text: "회원가입 오류",
      });
    }
  };

  const doLogin = () => {
    const { id, password } = postBody;
    dispatch(__doLogin({ id: id, password: password }));

    if (isError === true) {
      Toast.fire({
        icon: "error",
        title: error.message,
        text: "로그인 실패",
      });
    } else {
      setIsSignUp(false);
      setPostBody((prev) => ({
        ...prev,
        id: "",
        password: "",
        nickname: "",
      }));
      Toast.fire({
        icon: "success",
        title: "로그인 성공",
      });
      naviTo("/");
    }
  };

  return (
    <LoginPageBody>
      <LoginContainer>
        <LoginTitle>{isSignUp ? "회원가입" : "로그인"}</LoginTitle>
        <LoginInputBox>
          <LoginInput
            onChange={handleChange}
            name={"id"}
            value={postBody.id}
            $role={"id"}
          />
          <LoginInput
            onChange={handleChange}
            name={"password"}
            value={postBody.password}
            $role={"password"}
          />
          {isSignUp && (
            <SignUpInput
              onChange={handleChange}
              value={postBody.nickname}
              name={"nickname"}
            />
          )}
        </LoginInputBox>
        {isSignUp ? (
          <LoginButton
            onClick={doSignUp}
            onChange={handleChange}
            $isPass={isPassed}
            $to={"signup"}>
            가입하기
          </LoginButton>
        ) : (
          <LoginButton
            onClick={doLogin}
            onChange={handleChange}
            $isPass={true}
            $to={"login"}>
            로그인
          </LoginButton>
        )}
        <LoginButton onClick={toggleSignUp} $isPass={true} $to={"signup"}>
          회원가입
        </LoginButton>
      </LoginContainer>
    </LoginPageBody>
  );
}
