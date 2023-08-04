import React from "react";
import { Form, Input, Button, Checkbox } from "antd"; // ant design
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { signup } from "../../redux/modules/usersSlice";

const SignupForm: React.FC<any> = () => {
  //상단 hooks
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.users.isLogin);
  const isSignup = useSelector((state: RootState) => state.users.isSignup);

  // Event Handler
  const handleSignup = async (values: any) => {
    const { email, password, confrimPassword, agreed } = values;

    try {
      // 1. dB 검증 (email, password 있는지)
      // dB에 GET요청
      const response = await axios.get(
        `http://localhost:4000/users?email=${email}`
      );
      // console.log(response.data);   =>  [{ email: "mok05406@naver.com", id: 9, password: "dldkswls98!" }];

      // 1-1. dB에 있을 경우 (POST요청 이미 한 경우), 회원가입 불가
      if (response.data.length >= 1) {
        alert("이미 존재하는 아이디입니다.");
        return false;
      }

      // 1-2. dB에 없을 경우 (POST요청 안한 경우), 회원가입 가능
      await axios.post("http://localhost:4000/users", {
        email: email,
        password: password,
      });
      dispatch(signup);
      alert("회원가입 완료");
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
      return false;
    }
  };

  return (
    <FormWrapper onFinish={handleSignup}>
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
      <Form.Item
        label="비밀번호 확인"
        name="confirmPassword"
        rules={[
          { required: true, message: "비밀번호 확인을 입력해주세요." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="agreed"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("고객정보 이용동의에 체크해주세요.")
                  ),
          },
        ]}
      >
        <Checkbox>고객정보 이용동의</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default SignupForm;

const FormWrapper = styled(Form)`
  width: 300px;
`;
