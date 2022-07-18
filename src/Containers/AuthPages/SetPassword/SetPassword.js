import {LockOutlined} from "@ant-design/icons";
import {Button, Col, Form, Input, Row} from "antd";
import React from "react";

import Background from "../../../Assets/background.jpg";
import {Footer} from "../../../Components";

import {useSetPassword} from "../../../ApiService/authQueries";
import notificationService from "../../../Services/notification.service";
import utilService from "../../../Utils/utils.service";
import "../Auth.css";

const FormItem = Form.Item;

const SetPassword = ({match}) => {
  let userId = match.params[0];

  const {mutate: setPassword, isLoading} = useSetPassword({onSuccess});

  function onSuccess() {
    notificationService.success(
      "Password has been set successfully! Login to continue."
    );
    utilService.redirectToLogin();
  }

  const onFinish = async values => {
    const payload = {userId, password: values.password};
    setPassword(payload);
  };

  return (
    <div className="background">
      <div className="authContainer">
        <img src={Background} className="fullBackground" alt="" />
        <Row justify="center" className="gx-w-100">
          <Col xl={8} lg={10} md={12} sm={24} xs={24}>
            <div className="auth-main-content">
              <div className="auth-content-wrapper">
                <Form
                  initialValues={{remember: true}}
                  name="set-password"
                  onFinish={onFinish}
                  className="gx-signin-form gx-form-row0 gx-w-100"
                >
                  <Form.Item className="reset-password-container">
                    <Form.Item className="margin-0">
                      <h2 className="page-title gx-font-weight-semi-bold margin-0">
                        Set Password
                      </h2>
                    </Form.Item>
                    <p>Create your password below.</p>
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is Required",
                      },
                      {
                        pattern: new RegExp(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
                        ),
                        message:
                          "Password must be at least 8 characters and contain 1 number, 1 uppercase letter, 1 lowercase letter and 1 symbol",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      inputProps={{
                        size: "default",
                      }}
                      prefix={<LockOutlined />}
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
                      placeholder="Confirm password"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                  <FormItem>
                    <Button
                      loading={isLoading}
                      disabled={isLoading}
                      type="primary"
                      className="gx-mb-0 btn"
                      htmlType="submit"
                    >
                      Register
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

export default SetPassword;
