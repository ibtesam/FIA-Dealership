import {Avatar, Button, Col, Form, Input, Row, Tabs} from "antd";
import {default as React, useState} from "react";
import {useParams} from "react-router";
import MaskedInput from "react-text-mask";
import {
  useCustomerTransaction,
  useEditCustomer,
  useGetCustomerDetails,
} from "../../../ApiService/customerQueries";
import placeHolderImage from "../../../Assets/placeholder-img.png";
import Widget from "../Profile/Widget";
import "../Profile/index.css";
import {Patterns} from "../../../Constants/constant";
import VehicleCard from "./VehicleCard";
import notificationService from "../../../Services/notification.service";
import moment from "moment";

const CustomerProfile = () => {
  const loc = useParams();
  const [form] = Form.useForm();

  const {data: customer, isLoading} = useGetCustomerDetails({
    id: loc.customerId,
  });
  const {data: transactionData, isLoading: transactionLoading} = useCustomerTransaction(loc.customerId)

  const {mutate: edit, isLoading: isLoadingEdit} = useEditCustomer(
    {id: loc.customerId},
    {onSuccess}
  );

  function onSuccess() {
    notificationService.success("Customer edited successfully!");
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
      secondaryEmail: primaryEmail,
      phoneNumber: phoneNumber,
      address: {
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        type: 0,
      },
    };

    edit(payload);
  };
  return (
    <div className="main-content-wrapper">
      <div className="profile-container">
        <div className="profile-pic-wrapper">
          <div className="profile-avatar">
            <div className="avatar-upload">
              <Avatar
                className="size-150"
                alt="..."
                src={customer?.mediaUrl ? customer?.mediaUrl : placeHolderImage}
              />
            </div>
          </div>
          <div className="gx-profile-banner-avatar-info">
            <h2 className="profile-name">
              {customer ? `${customer?.firstName} ${customer?.lastName}` : "--"}
            </h2>
            <p className="profile-email">
              {customer ? `${customer?.primaryEmail}` : "--"}
            </p>
          </div>
        </div>
      </div>
      <Row>
        <Col xl={16} lg={16} md={16} sm={24} xs={24}>
          <Widget loading={isLoading} title="Profile" styleName="profile-card">
            <Form
              initialValues={customer}
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
                    name="primaryEmail"
                    required={false}
                  >
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
                          <p className="mx-wd">
                            Must be in the pattern specified
                          </p>
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
              <Form.Item>
                <h2>Address</h2>
              </Form.Item>
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
                      disabled={isLoading || isLoadingEdit}
                      loading={isLoading || isLoadingEdit}
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Widget>
        </Col>
        <Col xl={8} lg={8} md={8} sm={24} xs={24}>
          <Widget loading={transactionLoading} title="Transactions" styleName="profile-card">
            {transactionData?.length == 0 ? <div className="no-record">No Record Found</div> :
              transactionData?.map((item, index) => {
                return <div className="transaction" key={index}>{`${index + 1}. ${item.vehicleDetails} bought on ${moment(item.date).local().format("DD-MMM-YYYY")} for Rs ${item.totalCost}.`}</div>
              })}
          </Widget>
        </Col>
      </Row>
      <div className="profile-container">
        <h2 className="mt-2 heading margin-0">Vehicle Owned</h2>
      </div>
      {customer?.vehicles?.length == 0 ? (
        <div className="no-record">No Record Found</div>
      ) : (
        customer?.vehicles?.map(item => <VehicleCard item={item} />)
      )}
    </div>
  );
};

export default CustomerProfile;
