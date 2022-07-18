import React from "react";
import {Link} from "react-router-dom";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

import {Footer} from "../../../Components";
import utilService from "../../../Utils/utils.service";
import {useLogin} from "../../../ApiService/authQueries";
import {UNAUTHENTICATED_ROUTES} from "../../../Routes/constant";

import "../Auth.css";

const Login = props => {
  const [form] = Form.useForm();

  const {mutate: login, isLoading} = useLogin({onSuccess});

  let stayLoggedIn = true;

  const onFinish = async values => {
    stayLoggedIn = values?.rememberMe ?? false;
    const payload = {
      ...values,
      rememberMe: values?.rememberMe ?? false,
    };
    login(payload);
  };

  function onSuccess(data) {
    utilService.loginUser(data, stayLoggedIn);
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
                      Sign In
                    </h2>
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
                  <Form.Item>
                    <Row className="gx-mt-25">
                      <Col>
                        <Link
                          to={UNAUTHENTICATED_ROUTES.REGISTER}
                          className="noirProMedium mediumLine"
                        >
                          Don't have an account?
                        </Link>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item name="rememberMe" valuePropName="checked">
                    <Row justify="space-between" className="ant-row-flex">
                      <Col>
                        <Checkbox
                          className="noirProRegular remember-me-color mediumLine remember-me"
                          checked="true"
                        >
                          Remember Me
                        </Checkbox>
                      </Col>
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
                      Sign In
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

export default Login;
