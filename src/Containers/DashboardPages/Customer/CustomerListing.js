import React, {useState} from "react";
import {Row, Col, Modal} from "antd";
import {EyeOutlined, EditOutlined} from "@ant-design/icons";

import GridView from "../../../Components/Gridview";
import utilService from "../../../Utils/utils.service";
import placeholder from "../../../Assets/inventory-placeholder.webp";
import useGridRequest from "../../../Components/Gridview/useGridRequest";
import {useGetCustomerListing} from "../../../ApiService/customerQueries";
import AddCustomerModal from "./AddCustomerModal";
import AuthService from "../../../Utils/auth.service";

const CustomerListing = () => {
  const {replaceNullWithPlaceholder, redirectTo} = utilService;
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const {gridRequest: customerRequest, onSearch: onCustomerSearch} =
    useGridRequest();

  const user = AuthService.getUserInfo();

  const {data: customerList, isLoading} =
    useGetCustomerListing(customerRequest);

  const onVehicleClick = vehicle => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    } else {
      setSelectedVehicle({
        model: "Image not available",
        viewableLink: placeholder,
      });
    }
    setTimeout(() => {
      setModalVisible(!modalVisible);
    });
  };

  const onCancel = () => {
    setInitialValues(null);
    setModalVisible(false);
    setAddModalVisible(false);
  };
  const onCustomerAction = (isEdit, data) => {
    if (isEdit == true) {
      setInitialValues({
        streetAddress: data.address.streetAddress,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
        country: data.address.country,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        primaryEmail: data.primaryEmail,
      });
    }
    setAddModalVisible(true);
  };

  const columns = [
    {
      title: "Vehicle",
      key: "vehicles",
      dataIndex: "vehicles",
      sortByKey: "vehicles",
      align: "center",
      render: record => {
        return (
          <div
            className="image-container"
            onClick={() => onVehicleClick(record[0])}
          >
            <img
              src={record?.[0]?.viewableLink ?? placeholder}
              className="primary-image"
            />
            <div className="hover-image">
              <div className="hover-text">VIEW</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sortByKey: "name",
      align: "center",
      render: (_, records) => {
        const {firstName, lastName} = records;
        return <p className="name-text">{`${firstName} ${lastName}`}</p>;
      },
    },
    {
      title: "Email",
      key: "primaryEmail",
      dataIndex: "primaryEmail",
      sortByKey: "primaryEmail",
      align: "center",
      render: record => {
        return (
          <p className="email-text">{replaceNullWithPlaceholder(record)}</p>
        );
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      sortByKey: "address",
      align: "center",
      render: record => {
        const {city} = record;
        return <h5>{replaceNullWithPlaceholder(city)}</h5>;
      },
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      sortByKey: "phoneNumber",
      align: "center",
      render: record => {
        return <h5>{replaceNullWithPlaceholder(record)}</h5>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      render: (_, records) => {
        return (
          <div style={{display: "flex"}}>
            <div
              className="action-btn"
              onClick={() => redirectTo(`/customer/${records.customerId}`)}
            >
              <EyeOutlined className="icon-size-20" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="main-content-wrapper-2">
      <Row gutter={[0, 12]} className="margin-0">
        <Col span={24} className="padding-0">
          <GridView
            columns={columns}
            dataRequest={customerRequest}
            data={customerList}
            isLoading={isLoading}
            tableLayout={"auto"}
            isFetching={isLoading}
            tableKey="table-container"
            rowKey="id"
            onSearch={onCustomerSearch}
            onButtonClick={() => onCustomerAction(false)}
            buttonTitle={
              user?.roles[0] === "GlobalAdmin" ? "Add Customer" : null
            }
          />
        </Col>
      </Row>
      <Modal
        title={selectedVehicle?.model}
        visible={modalVisible}
        onCancel={onCancel}
        maskClosable
        footer={false}
        centered
        className="modal-icon"
      >
        <img src={selectedVehicle?.viewableLink} />
      </Modal>
      {addModalVisible && (
        <AddCustomerModal
          isVisible={addModalVisible}
          onCancel={onCancel}
          initialValues={initialValues}
        />
      )}
    </div>
  );
};

export default CustomerListing;
