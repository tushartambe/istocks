import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Layout, notification, Typography } from "antd";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UnAuthCustomLayout from '../components/UnAuthCustomLayout';
import { JWT_TOKEN, login } from '../utils/APIUtils';
const { Content } = Layout;
const { Title } = Typography;

const Login = (props) => {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const loginRequest = {
      "username": email,
      "password": password
    };

    login(loginRequest)
      .then(response => {
        localStorage.setItem(JWT_TOKEN, response.jwtToken);
        notification.success({
          message: 'iStocks',
          description: "You're successfully logged in.",
        });
        props.history.push("/");
      }).catch(error => {
        if (error.status === 401) {
          notification.error({
            message: 'iStocks',
            description: 'Your Username or Password is incorrect. Please try again!'
          });
        } else {
          notification.error({
            message: 'iStocks',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
  };

  return (
    <UnAuthCustomLayout>
      <Title level={4}> Log In </Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter your Email!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailTwoTone className="site-form-item-icon" />}
            placeholder="yourmail@domain.com"
            onChange={(e) => setLocalEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockTwoTone className="site-form-item-icon" />}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type={"primary"} onClick={onSubmit} block>
            Log In
              </Button>
              Don't have an account?<Link to="/register"> Create One</Link>
        </Form.Item>
      </Form>
    </UnAuthCustomLayout>
  );
};

export default Login;
