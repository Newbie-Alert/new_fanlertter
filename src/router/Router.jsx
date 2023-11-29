import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../globalStyle/GlobalStyle";
import Main from "../pages/Main/Main";
import Detail from "../pages/Detail/Detail";
import Login from "../pages/Login/Login";
import MyPage from "../pages/MyPage/MyPage";
import Header from "../components/Header/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my/:id" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
