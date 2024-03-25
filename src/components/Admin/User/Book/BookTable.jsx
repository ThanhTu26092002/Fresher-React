import { Col, Popconfirm, Row, Table } from "antd";
import InputSearch from "./InputSearch";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const BookPage = () => {
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
      title: "Tên sách",
      dataIndex: "thumbnail",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "date",
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
              //   onConfirm={() => hanleDeleteUser(record._id)}
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
              //   onClick={() => {
              //     setOpenModalUpdate(true);
              //     setDataUpdate(record);
              //   }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch />
        </Col>
        <Col span={24}>
          <Table columns={columns} rowKey="_id" />
        </Col>
      </Row>
    </>
  );
};

export default BookPage;
