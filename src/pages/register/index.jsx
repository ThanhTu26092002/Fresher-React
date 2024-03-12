import React from "react";

import { Button, Divider, Form, Input } from "antd";

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log("Success", values);
  };
  const onFinishFailed = (values) => {
    console.log("Failed", values);
  };
  return (
    <div
      className="register-page"
      style={{
        paddingLeft: "50px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Đăng ký mới người dùng</h3>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "0 auto",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{ span: 24 }}
          label="Full Name:"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your fullname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Phone:"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={true}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
