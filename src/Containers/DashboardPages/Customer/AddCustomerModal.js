import React, {useState} from "react";
import {Button, Col, Form, Row, Modal, Input, Select} from "antd";
import MaskedInput from "react-text-mask";
import {phoneMask2, USER_CONST} from "../../../Constants/constant";
import {useInvite} from "../../../ApiService/authQueries";
import notificationService from "../../../Services/notification.service";
import {useAddCustomer} from "../../../ApiService/customerQueries";

const {Option} = Select;
const AddCustomerModal = ({isVisible, onCancel}) => {
  const [selectedRole, setSelectedRole] = useState(0);
  const [form] = Form.useForm();

  const {mutate: invite, isLoading: isLoadingInvite} = useInvite({onSuccess});
  const {mutate: addCustomer, isLoading} = useAddCustomer({
    onSuccess,
  });

  function onSuccess() {
    if (selectedRole == 1) {
      notificationService.success("User has been invited successfully!");
    } else if (selectedRole == 2) {
      notificationService.success("Customer has been added successfully!");
    }
    onCancel();
  }

  const onFinish = async values => {
    const {
      firstName,
      lastName,
      primaryEmail,
      phoneNumber,
      country,
      city,
      zipCode,
      streetAddress,
      state,
    } = values;
    const payload = {
      firstName: firstName,
      lastName: lastName,
      primaryEmail: primaryEmail,
      phoneNumber: phoneNumber,
      type: 0,
      address: {
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        type: 0,
      },
    };
    if (selectedRole == 1) {
      delete payload.primaryEmail;
      delete payload.role;

      invite({...payload, email: primaryEmail, role: selectedRole});
    } else if (selectedRole == 2) {
      addCustomer(payload);
    }
  };
  return (
    <Modal
      title={"Add Customer"}
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
      centered
      className="modal-icon"
    >
      <Form
        // initialValues={}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="custom-modal custom-modal-scroll"
      >
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              required={false}
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              required={false}
              rules={[{required: true}]}
              label="Last Name"
              name="lastName"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Email Address"
              rules={[{required: true}]}
              name="primaryEmail"
              required={false}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Phone"
              name="phoneNumber"
              required={false}
              rules={[{required: true}]}
            >
              <MaskedInput
                type="text"
                placeholder="XXXX-XXXXXXX"
                className="ant-input"
                mask={phoneMask2}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Role"
              rules={[{required: true}]}
              name="role"
              required={false}
            >
              <Select placeholder="Select" onSelect={setSelectedRole}>
                {USER_CONST.map(item => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <h2>Address</h2>
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Street Address"
              required={false}
              name="streetAddress"
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="City"
              required={false}
              name="city"
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="State"
              required={false}
              name="state"
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Zip Code"
              required={false}
              name="zipCode"
              rules={[{required: true}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Country"
              required={false}
              name="country"
              rules={[{required: true}]}
            >
              <Input />
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
                disabled={isLoadingInvite || isLoading}
                loading={isLoadingInvite || isLoading}
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

export default AddCustomerModal;
