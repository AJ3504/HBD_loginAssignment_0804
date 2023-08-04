import React, { useState } from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/modules/usersSlice";
import { RootState } from "../redux/config/configStore";

const { Content } = Layout;

const AuthMain: React.FC = () => {
  //상단 hooks
  const [wantSignup, setWantSignup] = useState(true);

  // Event Handler
  const handleGoToSignup = () => {
    setWantSignup(true);
  };

  const handleGoToLogin = () => {
    setWantSignup(false);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Logo>HBD</Logo>
          <h1>회원가입/로그인 먼저 해주세요</h1>
          {wantSignup ? <SignupForm /> : <LoginForm />}
          <Button
            type="link"
            onClick={wantSignup ? handleGoToLogin : handleGoToSignup}
          >
            {wantSignup ? "로그인으로 이동" : "회원가입으로 이동"}
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthMain;

const Logo = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #1890ff;
`;
