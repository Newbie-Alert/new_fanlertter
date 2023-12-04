import React, { useState } from "react";
import * as St from "./styles";
import { Toast } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { __doLogin, __doSignUp } from "../../shared/redux/modules/auth";
import { useNavigate } from "react-router";

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
  const { isError, error } = useSelector((state) => state.auth);

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
    if (
      Boolean(postBody.id) &&
      Boolean(postBody.nickname) &&
      Boolean(postBody.password)
    ) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
    if (id.length === 0 || password.length === 0 || nickname.length === 0) {
      setIsPassed(false);
    }
    if (isSignUp === false) {
      if (Boolean(postBody.id) && Boolean(postBody.password)) {
        setIsPassed(true);
      }
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
        timer: 1500,
      }).then((value) => {
        value.isDismissed && naviTo("/");
      });
    }
  };

  return (
    <St.LoginPageBody>
      <St.LoginContainer>
        <St.LoginTitle>{isSignUp ? "회원가입" : "로그인"}</St.LoginTitle>
        <St.LoginInputBox>
          <St.LoginInput
            onChange={handleChange}
            name={"id"}
            value={postBody.id}
            $role={"id"}
          />
          <St.LoginInput
            onChange={handleChange}
            name={"password"}
            value={postBody.password}
            $role={"password"}
          />
          {isSignUp && (
            <St.SignUpInput
              onChange={handleChange}
              value={postBody.nickname}
              name={"nickname"}
            />
          )}
        </St.LoginInputBox>
        {isSignUp ? (
          <St.LoginButton
            onClick={doSignUp}
            onChange={handleChange}
            $isPass={isPassed}
            $to={"signup"}>
            가입하기
          </St.LoginButton>
        ) : (
          <St.LoginButton
            onClick={doLogin}
            onChange={handleChange}
            $isPass={isPassed}
            $to={"login"}>
            로그인
          </St.LoginButton>
        )}
        <St.LoginButton onClick={toggleSignUp} $isPass={true} $to={"signup"}>
          회원가입
        </St.LoginButton>
      </St.LoginContainer>
    </St.LoginPageBody>
  );
}
