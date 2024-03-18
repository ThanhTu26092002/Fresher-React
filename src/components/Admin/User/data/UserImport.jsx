import { InboxOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { Upload } from "antd";

const { Dragger } = Upload;
const UserImport = (props) => {
  const { setOpenModalImport, openModalImport } = props;

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "",
    customRequest: dummyRequest,
  };

  return (
    <>
      <Modal
        title="Import data user"
        width={"50vw"}
        open={openModalImport}
        onOk={() => setOpenModalImport(false)}
        onCancel={() => setOpenModalImport(false)}
        okText="Import data"
        okButtonProps={{
          disabled: true,
        }}
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            title={() => <span>Dữ Liệu upload</span>}
            columns={[
              { dataIndex: "fullName", title: "tên hiển thị" },
              { dataIndex: "email", title: "email" },
              { dataIndex: "phone", title: "số điện thoại" },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};
export default UserImport;
