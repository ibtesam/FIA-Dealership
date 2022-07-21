import {
  BranchesOutlined,
  CalendarOutlined,
  CarOutlined,
  DollarOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import {Button, Col, Form, Row} from "antd";
import {default as React, useState} from "react";
import {HostedForm} from "react-acceptjs";
import {useParams} from "react-router";
import {ResponsiveContainer, Bar, BarChart, YAxis, XAxis, Cell} from "recharts";
import {useCustomerBuy} from "../../../ApiService/customerQueries";
import {useGetVehicleDetails} from "../../../ApiService/vehicleQueries";
import placeholder from "../../../Assets/inventory-placeholder.webp";
import {FullPageLoader} from "../../../Components";
import {TRANSMISSION_ENUMS} from "../../../Constants/constant";
import notificationService from "../../../Services/notification.service";
import AuthService from "../../../Utils/auth.service";
import utilService from "../../../Utils/utils.service";
import "../Profile/index.css";
import Widget from "../Profile/Widget";

const ViewVehicle = () => {
  const loc = useParams();
  const user = AuthService.getUserInfo();
  const [form] = Form.useForm();

  const {mutate: buy, ...meta} = useCustomerBuy({onSuccess});

  function onSuccess() {
    notificationService.success(
      "Payment Successful! Your vehicle will be shipped to your address in 4 to 5 working days!"
    );
    // meta.refetch()
  }

  const {data: vehicle, isLoading} = useGetVehicleDetails({
    vehicleId: loc.id,
  });

  const inspectionReportData = [
    {
      name: "Exterior",
      rating: vehicle?.inspectionReport.exterior,
    },
    {
      name: "Interior",
      rating: vehicle?.inspectionReport.interior,
    },
    {
      name: "Transmission",
      rating: vehicle?.inspectionReport.transmission,
    },
    {
      name: "Suspension",
      rating: vehicle?.inspectionReport.suspension,
    },
    {
      name: "Engine",
      rating: vehicle?.inspectionReport.engine,
    },
    {
      name: "Air Conditioning",
      rating: vehicle?.inspectionReport.ac,
    },
  ];

  const blues = [
    ["#457AA6"],
    ["#457AA6", "#E3EBF2"],
    ["#264F73", "#457AA6", "#E3EBF2"],
    ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
    ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
  ];

  const getColor = (length, index) => {
    if (length <= blues.length) {
      return blues[length - 1][index];
    }

    return blues[blues.length - 1][index % blues.length];
  };

  const handleSubmit = async values => {
    if (values.messages.resultCode === "Ok") {
      buy({customerId: user.customerId, vehicleId: loc.id});
    }
  };

  const authData = {
    apiLoginID: "9u67ZWqm9",
    clientKey:
      "9jeywfcF69bs4B5m9B72H4vcLJ9ASY4k7Dve2QGtayNukX8YQGba9aSy9tfR54GM",
  };

  return (
    <div className="main-content-wrapper">
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div
          style={{
            width: "800px",
            margin: "auto",
          }}
        >
          <Widget>
            <h1
              className="email-text"
              style={{
                fontSize: "30px",
                textAlign: "center",
                marginBottom: "25px",
                alignSelf: "center",
              }}
            >{`${vehicle.make} ${vehicle.model}`}</h1>
            <div className="image-container-details">
              <img
                src={vehicle.viewableLink ?? placeholder}
                className="primary-image"
              />
            </div>
            <Row className="gx-mt-25" style={{justifyContent: "center"}}>
              <div className="box" style={{borderTopLeftRadius: "12px"}}>
                <h3>Transmission</h3>
                <BranchesOutlined style={{fontSize: "180%"}} />
                <h2>{TRANSMISSION_ENUMS[vehicle.transmissionType]}</h2>
              </div>
              <div className="box">
                <h3>Year</h3>
                <CalendarOutlined style={{fontSize: "180%"}} />
                <h2>{vehicle.year}</h2>
              </div>
              <div className="box">
                <h3>Mileage</h3>
                <CarOutlined style={{fontSize: "180%"}} />
                <h2>{`${vehicle.mileage} km`}</h2>
              </div>
              <div className="box">
                <h3>Registration</h3>
                <PushpinOutlined style={{fontSize: "180%"}} />
                <h2>{vehicle.registration}</h2>
              </div>
              <div className="box" style={{borderBottomRightRadius: "12px"}}>
                <h3>Cost</h3>
                <DollarOutlined style={{fontSize: "180%"}} />
                <h2>{`Rs. ${vehicle.cost}`}</h2>
              </div>
            </Row>
            <Row className="gx-mt-25" style={{justifyContent: "center"}}>
              <h2>Inspection Report</h2>
            </Row>
            <Row className="gx-mt-25" style={{justifyContent: "center"}}>
              <ResponsiveContainer
                width={"100%"}
                height={30 * inspectionReportData.length}
                // debounce={50}
              >
                <BarChart
                  data={inspectionReportData}
                  layout="vertical"
                  margin={{
                    left: 30,
                  }}
                >
                  <XAxis hide axisLine={false} type="number" />
                  <YAxis
                    yAxisId={0}
                    dataKey={"name"}
                    type="category"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    orientation="right"
                    yAxisId={1}
                    dataKey={"rating"}
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={value => value.toLocaleString()}
                    mirror
                  />
                  <Bar
                    dataKey={"rating"}
                    minPointSize={2}
                    barSize={15}
                    animationDuration={2000}
                  >
                    {inspectionReportData.map((d, idx) => {
                      return (
                        <Cell
                          key={d.rating}
                          fill={getColor(inspectionReportData.length, idx)}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Row>
            <Row className="gx-mt-50">
              <h3>{vehicle.description}</h3>
            </Row>
          </Widget>
          {vehicle.status != 2 && (
            <HostedForm
              buttonClassName="noirProMedium"
              buttonStyle={{
                backgroundColor: "#004158",
                fontWeight: "medium",
                color: "white",
                padding: "10px 20px",
                border: 0,
                minWidth: "120px",
                marginTop: "25px",
                borderRadius: "5px",
                cursor: "pointer",
                float: "right",
                marginBottom: "30px",
              }}
              authData={authData}
              onSubmit={handleSubmit}
              buttonText="Buy Now"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewVehicle;
