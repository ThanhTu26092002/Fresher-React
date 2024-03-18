import { useState } from "react";
import { Form, Modal, message, notification, Input, Divider } from "antd";

import { callCreateAUser } from "../../../services/api";

const UserModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateAUser({ fullName, password, email, phone });
    if (res && res.data) {
      message.success("Tạo mới người dùng thành công");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        onText={"tạo mới"}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị" }]}
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            labelCol={{ span: 24 }}
            g
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            confirmLoading={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModalCreate;
