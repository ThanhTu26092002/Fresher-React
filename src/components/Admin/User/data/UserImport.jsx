import { Modal, Table, message, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import * as XLSX from "xlsx";
import { useState } from "react";
import { callBulkCreateUser } from "../../../../services/api";
import templateFile from "./templateFile.xlsx?url";

const { Dragger } = Upload;
const UserImport = (props) => {
  const { setOpenModalImport, openModalImport } = props;
  const [dataExecel, setDataExcel] = useState([]);

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
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            console.log("check json", json);
            if (json && data.length > 0) setDataExcel(json);
          };
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.file);
    },
  };
  const handleSubmit = async () => {
    const data = dataExecel.map((item) => {
      item.password = "123456";
      return item;
    });
    const res = await callBulkCreateUser(data);
    if (res.data) {
      notification.success({
        description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: "upload thành công",
      });
      setDataExcel([]);
      setOpenModalImport(false);
      props.fetchUser();
    } else {
      notification.error({
        description: res.message,
        message: "đã có lỗi xảy ra",
      });
    }
  };
  return (
    <>
      <Modal
        title="Import data user"
        width={"50vw"}
        open={openModalImport}
        onOk={() => handleSubmit()}
        onCancel={() => {
          setOpenModalImport(false);
          setDataExcel([]);
        }}
        okText="Import data"
        okButtonProps={{
          disabled: dataExecel.length < 1,
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
            uploading company data or other banned files. &nbsp;
            <a
              onClick={(e) => e.stopPropagation()}
              href={templateFile}
              download
            >
              {" "}
              Dowload Sample File
            </a>
          </p>
        </Dragger>
        <div style={{ paddingTop: 20 }}>
          <Table
            dataSource={dataExecel}
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
