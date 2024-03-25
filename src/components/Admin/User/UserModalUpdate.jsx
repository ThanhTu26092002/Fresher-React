import { useEffect, useState } from "react";
import { Divider, Form, Input, Modal, message, notification } from "antd";
import { callUpdateUser } from "../../../services/api";

const UserModalUpdate = (props) => {
  const { openModelUpdate, setOpenModalUpdate } = props;
  const [dataUpdate, setDataUpdate] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, _id, phone } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(fullName, _id, phone);
    if (res && res.data) {
      message.success("Cập nhật người dùng thành công");
      setOpenModalUpdate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={openModelUpdate}
        onOk={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        okText="cập nhật"
        cancleText="Hủy"
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
            hidden
            labelCol={{ span: 24 }}
            label="Id"
            name="_id"
            rules={[{ required: true, message: "vui lòng nhập id" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "vui lòng nhập tên hiển thị" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="email"
            name="email"
            rules={[{ required: true, message: "vui lòng nhập email" }]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalUpdate;
