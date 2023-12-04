import React from "react";
import Banner from "../../components/Banner/Banner";
import * as St from "./styles";
import Input from "../../components/Input/Input";
import Message from "../../components/Message/Message";

export default function Main() {
  return (
    <St.MainContainer>
      <Banner />
      <Input />
      <Message />
    </St.MainContainer>
  );
}
