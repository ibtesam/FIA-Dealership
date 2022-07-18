import React from "react";
import {Link} from "react-router-dom";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

import {Footer} from "../../../Components";
import {Patterns} from "../../../Constants/constant";
import utilService from "../../../Utils/utils.service";
import {useRegister} from "../../../ApiService/authQueries";
import {UNAUTHENTICATED_ROUTES} from "../../../Routes/constant";

import "../Auth.css";
import notificationService from "../../../Services/notification.service";

const Register = props => {
  const [form] = Form.useForm();

  const {mutate: register, isLoading} = useRegister({onSuccess});

  const onFinish = async values => {
    const payload = {
      ...values,
      rememberMe: false,
    };

    register(payload);
  };

  function onSuccess(data) {
    notificationService.success(
      "Account Created Successfully! Login to continue."
    );
    utilService.redirectToLogin();
  }

  return (
    <div className="background">
      <div className="authContainer">
        <Row justify="center" className="gx-w-100">
          <Col xl={8} lg={10} md={12} sm={24} xs={24}>
            <div className="auth-main-content">
              <div className="auth-content-wrapper">
                <Form
                  initialValues={{remember: true}}
                  name="login"
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item>
                    <h2 className="h2 noirProMedium gx-font-weight-medium gx-m-0">
                      Register
                    </h2>
                  </Form.Item>
                  <Form.Item
                    required={false}
                    name="firstName"
                    label=""
                    initialValue=""
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: "First name is required.",
                      },
                    ]}
                  >
                    <Input
                      className=""
                      placeholder="First Name"
                      prefix={
                        <span className="fia-my-profile gx-pr-2 auth-icon-color" />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    required={false}
                    name="lastName"
                    label=""
                    initialValue=""
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: "Last name is required.",
                      },
                    ]}
                  >
                    <Input
                      className=""
                      placeholder="Last Name"
                      prefix={
                        <span className="fia-my-profile gx-pr-2 auth-icon-color" />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    required={false}
                    name="email"
                    label=""
                    initialValue=""
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: "Email is required.",
                      },
                      {type: "email", message: "Email is Invalid"},
                    ]}
                  >
                    <Input
                      className=""
                      placeholder="Enter email"
                      prefix={
                        <span className="fia-my-profile gx-pr-2 auth-icon-color" />
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    required={false}
                    initialValue=""
                    validateTrigger="onBlur"
                    label=""
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required.",
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
                      type="password"
                      placeholder="Password"
                      prefix={
                        <span className="fia-password gx-pr-2 auth-icon-color" />
                      }
                      iconRender={visible =>
                        visible ? (
                          <EyeTwoTone
                            color="##9f9f9f"
                            className="auth-icon-color"
                          />
                        ) : (
                          <EyeInvisibleOutlined />
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    required={false}
                    initialValue=""
                    validateTrigger="onBlur"
                    label=""
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please re-enter your password.",
                      },
                      ({getFieldValue}) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder="Confirm Password"
                      prefix={
                        <span className="fia-password gx-pr-2 auth-icon-color" />
                      }
                      iconRender={visible =>
                        visible ? (
                          <EyeTwoTone
                            color="##9f9f9f"
                            className="auth-icon-color"
                          />
                        ) : (
                          <EyeInvisibleOutlined />
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Row className="gx-mt-25">
                      <Col>
                        <Link
                          to={UNAUTHENTICATED_ROUTES.LOGIN}
                          className="noirProMedium mediumLine"
                        >
                          Already have an account?
                        </Link>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Row justify="space-between" className="ant-row-flex">
                      <Col>
                        <Link
                          to={UNAUTHENTICATED_ROUTES.FORGET_PASSWORD}
                          className="noirProMedium mediumLine"
                        >
                          Forgot Password?
                        </Link>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="gx-mb-0 login-btn noirProMedium gx-font-weight-medium"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
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

export default Register;
