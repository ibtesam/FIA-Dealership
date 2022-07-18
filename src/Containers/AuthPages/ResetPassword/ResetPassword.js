import React, {useState} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

import {Footer} from "../../../Components";
import {Patterns} from "../../../Constants/constant";

import "../Auth.css";
import {useResetPassword} from "../../../ApiService/authQueries";
import utilService from "../../../Utils/utils.service";
import notificationService from "../../../Services/notification.service";

const FormItem = Form.Item;

const ResetPassword = ({location, match}) => {
  let userId = new URLSearchParams(location.search).get("userid");
  let token = new URLSearchParams(location.search).get("code");
  const {mutate: resetPassword, isLoading} = useResetPassword({onSuccess});

  function onSuccess() {
    notificationService.success(
      "Password has been reset successfully! Login to continue."
    );
    utilService.redirectToLogin();
  }
  const onFinish = async values => {
    const payload = {updatedPassword: values.password, userId, token};
    resetPassword(payload);
  };

  return (
    <div className="background">
      <div className="authContainer">
        <Row justify="center" className="gx-w-100">
          <Col xl={8} lg={10} md={12} sm={24} xs={24}>
            <div className="auth-main-content">
              <div className="logo-container"></div>
              <div className="auth-content-wrapper">
                <Form
                  initialValues={{remember: true}}
                  name="reset-password"
                  onFinish={onFinish}
                  className="gx-signin-form gx-form-row0 gx-w-100"
                >
                  <Form.Item className="reset-password-container">
                    <Form.Item className="margin-0">
                      <h2 className="h2 noirProMedium gx-font-weight-medium gx-m-0">
                        Reset Password
                      </h2>
                    </Form.Item>
                    <p className="noirProRegular mediumLine singleLineHeight gx-m-0">
                      Enter your password below.
                    </p>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is Required",
                      },
                      {
                        pattern: Patterns.passwordPattern3,
                        message: (
                          <p className="mx-wd">
                            Password must be at least 8 characters and contain 1
                            number, 1 uppercase letter, 1 lowercase letter and 1
                            symbol
                          </p>
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="New password"
                      inputProps={{
                        size: "default",
                      }}
                      prefix={
                        <span className="fia-password gx-pr-2 auth-icon-color" />
                      }
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    required={false}
                    name="confirmPassword"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Confirm Password is Required",
                      },
                      ({getFieldValue}) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Passwords do not match");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Repeat new password"
                      prefix={
                        <span className="fia-password gx-pr-2 auth-icon-color" />
                      }
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                  <FormItem>
                    <Button
                      loading={isLoading}
                      disabled={isLoading}
                      type="primary"
                      className="reset-btn noirProMedium gx-font-weight-medium"
                      htmlType="submit"
                    >
                      Reset Password
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer className="auth-footer" footerClass="footer-text" />
    </div>
  );
};

export default ResetPassword;
