import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {useForgetPassword} from "../../../ApiService/authQueries";

import {Footer} from "../../../Components";
import utilService from "../../../Utils/utils.service";

import "../Auth.css";

const ForgetPassword = () => {
  const [form] = Form.useForm();

  const {mutate: forgetPassword, isLoading} = useForgetPassword({onSuccess});

  const onFinish = async values => {
    forgetPassword(values);
  };

  function onSuccess() {
    utilService.redirectToLogin();
  }

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
                  name="forget-password"
                  onFinish={onFinish}
                  form={form}
                >
                  <Form.Item>
                    <h2 className="h2 noirProMedium gx-font-weight-medium ">
                      Forgot Password?
                    </h2>
                    <p className="noirProRegular mediumLine gx-m-0 forgot-password-text">
                      Please enter your email address, and we will send you a link
                      to reset your password.
                    </p>
                  </Form.Item>
                  <Form.Item
                    required={false}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Email is Required",
                      },
                      {
                        type: "email",
                        message: "Email is Invalid",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email address"
                      prefix={
                        <span className="fia-my-profile gx-pr-2 auth-icon-color" />
                      }
                    />
                  </Form.Item>
                  <Form.Item className="gx-m-0">
                    <Row type="flex" align="middle">
                      <Col>
                        <Button
                          loading={isLoading}
                          disabled={isLoading}
                          type="primary"
                          className="reset-btn noirProMedium gx-font-weight-medium"
                          htmlType="submit"
                        >
                          Send Email
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer
        className="auth-footer"
        footerClass="footer-text"
      />
    </div>
  );
};

export default ForgetPassword;
