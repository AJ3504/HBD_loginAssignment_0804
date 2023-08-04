import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { login } from "../../redux/modules/usersSlice";

const LoginForm: React.FC = () => {
  // 상단 hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.users.isLogin);
  const isSignup = useSelector((state: RootState) => state.users.isSignup);

  // Event Handler
  const handleLogin = async (values: any) => {
    try {
      // 1. dB 검증 (email, password 있는지)
      const response = await axios.get(
        `http://localhost:4000/users?email=${values.email}&passowrd=${values.password}`
      );

      // 1-1. dB에 없을 경우 (POST요청 안한 경우), 로그인 불가
      if (response.data.length <= 0) {
        alert("일치하는 회원이 없습니다. 회원가입 먼저 해주세요!");
        return false;
      } else {
        // 1-2. dB에 있을 경우 (POST요청 한 경우), 로그인 가능 => 후처리 진행
        //
        localStorage.setItem("token", shortid.generate());
        localStorage.setItem("email", values.email);
        //
        dispatch(login);
        alert("로그인 성공");
        //
        navigate("/authorized");
      }
    } catch (err) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  return (
    <FormWrapper onFinish={handleLogin}>
      <Form.Item
        label="이메일"
        name="email"
        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled(Form)`
  width: 300px;
`;
