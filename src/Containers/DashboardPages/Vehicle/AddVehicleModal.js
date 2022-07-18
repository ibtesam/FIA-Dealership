import {Button, Col, Form, Input, Modal, Row, Select, Slider} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, {useState} from "react";
import {
  useAddVehicle,
  useEditVehicle,
} from "../../../ApiService/vehicleQueries";
import placeholder from "../../../Assets/inventory-placeholder.webp";
import {TRANSMISSION_CONST} from "../../../Constants/constant";
import notificationService from "../../../Services/notification.service";

const {Option} = Select;
const AddVehicleModal = ({isVisible, onCancel, initialValues, refetch}) => {
  const [form] = Form.useForm();
  const [carImage, setCarImage] = useState(
    initialValues ? initialValues.viewableLink : null
  );
  const [exterior, setExterior] = useState(
    initialValues ? initialValues.inspectionReport.exterior : 1
  );
  const [interior, setInterior] = useState(
    initialValues ? initialValues.inspectionReport.interior : 1
  );
  const [transmission, setTransmission] = useState(
    initialValues ? initialValues.inspectionReport.transmission : 1
  );
  const [Ac, setAc] = useState(
    initialValues ? initialValues.inspectionReport.ac : 1
  );
  const [engine, setEngine] = useState(
    initialValues ? initialValues.inspectionReport.engine : 1
  );
  const [suspension, setSuspension] = useState(
    initialValues ? initialValues.inspectionReport.suspension : 1
  );

  const {mutate: add, isLoading: isLoadingAdd} = useAddVehicle({
    onSuccess,
  });
  const {mutate: edit, isLoading} = useEditVehicle(
    {vehicleId: initialValues?.id},
    {
      onSuccess,
    }
  );

  function onSuccess() {
    initialValues
      ? notificationService.success("Vehicle has been edited successfully!")
      : notificationService.success("Vehicle has been added successfully!");
    onCancel();
    refetch();
  }

  const onFinish = async values => {
    const {
      cost,
      description,
      make,
      mileage,
      model,
      registration,
      transmissionType,
      viewableLink,
      vin,
      year,
    } = values;
    const payload = {
      cost: cost,
      model: model,
      vin: vin,
      viewableLink: viewableLink,
      make: make,
      year: year,
      mileage: mileage,
      registration: registration,
      description: description,
      transmissionType: transmissionType,
      inspectionReport: {
        exterior: exterior,
        interior: interior,
        transmission: transmission,
        ac: Ac,
        engine: engine,
        suspension: suspension,
      },
    };
    initialValues
      ? edit({...payload, status: 1, id: initialValues.id})
      : add(payload);
  };
  const onSetCarImage = event => {
    const {value} = event.target;
    if (value.length < 10) {
      setCarImage(null);
    } else {
      setCarImage(`${value}`);
    }
  };
  return (
    <Modal
      title={"Add Vehicle"}
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
      centered
      className="modal-icon"
    >
      <img src={carImage ?? placeholder} className="primary-image" />
      <Form
        initialValues={initialValues}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="custom-modal2"
      >
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Model"
              name="model"
              required={false}
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Make"
              name="make"
              required={false}
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Image Link"
              rules={[{required: true}]}
              name="viewableLink"
              required={false}
            >
              <Input onChange={onSetCarImage} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Year"
              rules={[{required: true}]}
              name="year"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Cost"
              rules={[{required: true}]}
              name="cost"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Mileage"
              rules={[{required: true}]}
              name="mileage"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Transmission Type"
              rules={[{required: true}]}
              name="transmissionType"
              required={false}
            >
              <Select placeholder="Select">
                {TRANSMISSION_CONST.map(item => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Registration"
              rules={[{required: true}]}
              name="registration"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Vin"
              rules={[{required: true}]}
              name="vin"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <h2>Inspection</h2>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Exterior" name="exterior" required={false}>
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setExterior}
                  className="width-90"
                  value={exterior}
                />
                <div className="inspection">{exterior}</div>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Interior" name="interior" required={false}>
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setInterior}
                  className="width-90"
                  value={interior}
                />
                <div className="inspection">{interior}</div>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Transmission"
              name="transmission"
              required={false}
            >
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setTransmission}
                  className="width-90"
                  value={transmission}
                />
                <div className="inspection">{transmission}</div>
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Air Conditioner" name="ac" required={false}>
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setAc}
                  className="width-90"
                  value={Ac}
                />
                <div className="inspection">{Ac}</div>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Engine" name="engine" required={false}>
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setEngine}
                  className="width-90"
                  value={engine}
                />
                <div className="inspection">{engine}</div>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Suspension" name="suspension" required={false}>
              <div className="flexWrap width-100">
                <Slider
                  min={1}
                  max={10}
                  tooltipVisible={false}
                  onChange={setSuspension}
                  className="width-90"
                  value={suspension}
                />
                <div className="inspection">{suspension}</div>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item label="Description" name="description" required={false}>
              <TextArea rows={10} />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item className="margin-0" style={{textAlign: "end"}}>
              <Button
                type="primary"
                htmlType="submit"
                className="margin-0"
                disabled={isLoading || isLoadingAdd}
                loading={isLoading || isLoadingAdd}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddVehicleModal;
