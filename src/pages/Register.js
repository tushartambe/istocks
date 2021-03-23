import { LockTwoTone, MailTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Layout, notification, Typography } from "antd";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { register } from "../apis/authentication";
import UnAuthCustomLayout from '../components/UnAuthCustomLayout';
import { JWT_TOKEN } from "../constants/constants";


const { Content } = Layout;
const { Title } = Typography;


const Register = (props) => {
  const [email, setLocalEmail] = useState("");
  const [name, setLocalName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const registerRequest = {
      "email": email,
      "password": password,
      "name": name
    };

    register(registerRequest)
      .then(response => {
        notification.success({
          message: 'iStocks',
          description: "Thank you! You're successfully registered. Please Login to continue!",
        });
        props.history.push("/login");
      }).catch(error => {
        notification.error({
          message: 'iStocks',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      });

  };

  return (
    <UnAuthCustomLayout>
      <Title level={4}>Create Account</Title>
      <Form
        name="normal_signup"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your Name!",
            },
          ]}
        >
          <Input
            prefix={<SmileTwoTone className="site-form-item-icon" />}
            placeholder="Your Name"
            onChange={(e) => setLocalName(e.target.value)}
          />
        </Form.Item>
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
              message: "Please enter your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockTwoTone className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockTwoTone className="site-form-item-icon" />}
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} onClick={onSubmit} block>
            Create Account
              </Button>
              Already have an account? <Link to="/login">Log in</Link>
        </Form.Item>
      </Form>
    </UnAuthCustomLayout>
  );
};

export default Register;
