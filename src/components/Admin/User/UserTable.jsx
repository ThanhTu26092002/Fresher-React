import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";

import { useEffect, useState } from "react";
import { callDeleteUser, callFetchListUser } from "../../../services/api";
import InputSearch from "./InputSearch";
import UserImport from "./data/UserImport";
import UserModalUpdate from "./UserModalUpdate";
import UserModalCreate from "./UserModalCreate";

import * as XLSX from "xlsx";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery]);

  const fetchUser = async (searchFilter) => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              // setDataViewDetail(record);
              // setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },

    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "date",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa User"}
              description={"Bạn có chắc chắn muốn xóa user này không?"}
              onConfirm={() => hanleDeleteUser(record._id)}
              okText="xác nhận"
              cancelText="hủy"
            >
              <span style={{ cursor: "pointer", margin: "0 20px" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>

            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };
  const hanleDeleteUser = async (userId) => {
    const res = await callDeleteUser(userId);
    if (res && res.data) {
      message.success("xóa user thành công");
      fetchUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List User</span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData()}
          >
            Export
          </Button>
          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => {
              setOpenModalImport(true);
            }}
          >
            Import
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setOpenModalCreate(true);
            }}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <ReloadOutlined /> edit
          </Button>
        </span>
      </div>
    );
  };

  const handleSearch = (query) => {
    setFilter(query);
  };
  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            loading={isLoading}
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
            }}
          />
        </Col>
      </Row>
      <UserModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
      />
      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
      />
    </>
  );
};

export default UserTable;
