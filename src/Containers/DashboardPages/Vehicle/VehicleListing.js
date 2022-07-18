import React, {useState} from "react";
import {Col, Row, Modal} from "antd";
import {EyeOutlined, EditOutlined} from "@ant-design/icons";

import GridView from "../../../Components/Gridview";
import utilService from "../../../Utils/utils.service";
import placeholder from "../../../Assets/inventory-placeholder.webp";
import {useGetVehicleListing} from "../../../ApiService/vehicleQueries";
import useGridRequest from "../../../Components/Gridview/useGridRequest";
import AddVehicleModal from "./AddVehicleModal";
import AuthService from "../../../Utils/auth.service";
import {VEHICLE_STATUS_CONST} from "../../../Constants/constant";

const VehicleListing = () => {
  const {replaceNullWithPlaceholder, redirectTo} = utilService;
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const {gridRequest: vehicleRequest, onSearch: onVehicleSearch} =
    useGridRequest();

  const user = AuthService.getUserInfo();

  const {
    data: vehicleList,
    isLoading,
    refetch,
  } = useGetVehicleListing(vehicleRequest);

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

  const onVehicleAction = (isEdit, data) => {
    if (isEdit == true) {
      setInitialValues(data);
    }
    setAddModalVisible(true);
  };

  const columns = [
    {
      title: "Image",
      key: "viewableLink",
      dataIndex: "viewableLink",
      align: "center",
      render: (record, records) => {
        return (
          <div
            className="image-container"
            onClick={() => onVehicleClick(records)}
          >
            <img src={record ?? placeholder} className="primary-image" />
            <div className="hover-image">
              <div className="hover-text">VIEW</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Model",
      key: "model",
      dataIndex: "model",
      align: "center",
      render: record => {
        return (
          <p className="email-text">{replaceNullWithPlaceholder(record)}</p>
        );
      },
    },
    {
      title: "Make",
      key: "make",
      dataIndex: "make",
      align: "center",
      render: record => {
        return (
          <p className="email-text">{replaceNullWithPlaceholder(record)}</p>
        );
      },
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      align: "center",
      render: record => {
        return (
          <p className="email-text">{replaceNullWithPlaceholder(record)}</p>
        );
      },
    },
    {
      title: "Mileage",
      key: "mileage",
      dataIndex: "mileage",
      align: "center",
      render: record => {
        return (
          <p className="email-text">
            {replaceNullWithPlaceholder(`${record} km`)}
          </p>
        );
      },
    },
    {
      title: "Date Sold",
      key: "salesDate",
      dataIndex: "salesDate",
      align: "center",
      render: record => {
        return (
          <p className="email-text">
            {record ? utilService.convertDateTime(record, "DD-MMMM-YY") : "--"}
          </p>
        );
      },
    },
    {
      title: "Cost",
      key: "cost",
      dataIndex: "cost",
      align: "center",
      render: record => {
        return <p className="email-text">{record ? `Rs. ${record}` : "--"}</p>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: record => {
        return <p className="email-text">{VEHICLE_STATUS_CONST[record]}</p>;
      },
    },
    {
      title: "Action",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      render: (_, records) => {
        return (
          <div style={{display: "flex"}}>
            {records.status != 2 && (
              <div
                className="action-btn"
                onClick={() => redirectTo(`/vehicle/${records.id}`)}
              >
                <EyeOutlined className="icon-size-20" />
              </div>
            )}
            {user?.roles[0] == "GlobalAdmin" && (
              <div
                className="action-btn"
                onClick={() => onVehicleAction(true, records)}
              >
                <EditOutlined className="icon-size-20" />
              </div>
            )}
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
            dataRequest={vehicleRequest}
            data={vehicleList}
            isLoading={isLoading}
            tableLayout={"auto"}
            isFetching={isLoading}
            tableKey="table-container"
            rowKey="id"
            onSearch={onVehicleSearch}
            onButtonClick={onVehicleAction}
            buttonTitle={
              user?.roles[0] === "GlobalAdmin" ? "Add Vehicle" : null
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
        <AddVehicleModal
          isVisible={addModalVisible}
          onCancel={onCancel}
          initialValues={initialValues}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default VehicleListing;
