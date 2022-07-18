import React, {useState} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {useUpdateProfile} from "../../../ApiService/authQueries";
import {Patterns} from "../../../Constants/constant";
import notificationService from "../../../Services/notification.service";

const Profile = props => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(() => {
    if (!props.user) {
      return {};
    }
    return props.user;
  });

  const {mutateAsync: updateProfile, isLoading} = useUpdateProfile(
    {accountId: user.userId},
    {
      onSuccess,
    }
  );
  const onFinish = async values => {
    const payload = {...values};
    delete payload.roles;
    updateProfile(payload);
  };

  function onSuccess() {
    form.resetFields();
    notificationService.success("Profile updated successfully!");
  }
  return (
    <>
      <Form
        initialValues={user}
        layout="vertical"
        form={form}
        onFinish={onFinish}
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
        </Row>
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Email Address"
              name="emailAddress"
              required={false}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row
          gutter={[24, 0]}
          justify="start"
          align="top"
          className="ant-row-flex"
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item label="User Role" name="role" required={false}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Phone"
              name="phoneNumber"
              required={false}
              rules={[
                {requred: true},
                {
                  pattern: Patterns.phoneNumberPattern,
                  message: (
                    <p className="mx-wd">Must be in the pattern specified</p>
                  ),
                },
              ]}
            >
              <Input
                type="text"
                placeholder="+92-3461122345"
                className="ant-input"
              />
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
                disabled={isLoading}
                loading={isLoading}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Profile;
