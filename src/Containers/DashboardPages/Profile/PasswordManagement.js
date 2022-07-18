import {Button, Col, Form, Input, Row} from "antd";
import React from "react";

import {useUpdatePassword} from "../../../ApiService/authQueries";
import {Patterns} from "../../../Constants/constant";
import notificationService from "../../../Services/notification.service";

const PasswordManagement = props => {
  const [form] = Form.useForm();
  const {mutateAsync: changePassword, isLoading} = useUpdatePassword({
    onSuccess,
  });
  const onFinish = async values => {
    const payload = {...values};
    delete payload.confirmPass;
    changePassword(payload);
  };

  function onSuccess() {
    form.resetFields();
    notificationService.success("Password updated successfully!");
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="reset-password-form"
    >
      <Row
        gutter={[24, 0]}
        justify="start"
        align="top"
        className="ant-row-flex margin-0"
      >
        <Col
          className="padding-0"
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
        >
          <Form.Item
            name="currentPassword"
            validateTrigger="onBlur"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "You must enter your current password",
              },
            ]}
            required={false}
          >
            <Input.Password placeholder="Type current password" />
          </Form.Item>
        </Col>
      </Row>
      <Row
        gutter={[24, 0]}
        justify="start"
        align="top"
        className="ant-row-flex margin-0"
      >
        <Col
          className="padding-0"
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
        >
          <Form.Item
            name="updatedPassword"
            validateTrigger="onBlur"
            label={"New Password"}
            rules={[
              {
                required: true,
                message: "You must enter a new password.",
              },
              {
                pattern: Patterns.PASSWORD_PATTERN,
                message: (
                  <p className="mx-wd">
                    Password must be at least 8 characters and contain 1 number,
                    1 uppercase letter, 1 lowercase letter and 1 symbol
                  </p>
                ),
              },
            ]}
            required={false}
            className="gx-font-weight-normal"
          >
            <Input.Password placeholder="Type new password" />
          </Form.Item>
        </Col>
      </Row>
      <Row
        gutter={[24, 0]}
        justify="start"
        align="top"
        className="ant-row-flex margin-0"
      >
        <Col
          className="padding-0"
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
        >
          <Form.Item
            required={false}
            name="confirmPass"
            label="Confirm Password"
            dependencies={["updatedPassword"]}
            hasFeedback
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "You must confirm your password.",
              },
              {
                pattern: Patterns.passwordPattern,
                message: (
                  <p className="mx-wd">
                    Password must be at least 8 characters and contain 1 number,
                    1 uppercase letter, 1 lowercase letter and 1 symbol
                  </p>
                ),
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue("updatedPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match.");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Repeat new password" />
          </Form.Item>
        </Col>
      </Row>

      <Row
        gutter={[24, 0]}
        justify="start"
        align="top"
        className="ant-row-flex margin-0"
      >
        <Col
          className="padding-0"
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
        >
          <Form.Item className="margin-0" style={{textAlign: "end"}}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PasswordManagement;
