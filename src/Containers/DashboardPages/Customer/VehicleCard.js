import React from 'react'
import {
    BranchesOutlined,
    CalendarOutlined,
    CarOutlined,
    DollarOutlined,
    DashboardOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import {Avatar, Button, Col, Form, Input, Row, Tabs} from "antd";
import {TRANSMISSION_ENUMS} from '../../../Constants/constant';
import {Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis} from 'recharts';

const VehicleCard = ({item}) => {
    const inspectionReportData = [
        {
            name: "Exterior",
            rating: item?.inspectionReport.exterior,
        },
        {
            name: "Interior",
            rating: item?.inspectionReport.interior,
        },
        {
            name: "Transmission",
            rating: item?.inspectionReport.transmission,
        },
        {
            name: "Suspension",
            rating: item?.inspectionReport.suspension,
        },
        {
            name: "Engine",
            rating: item?.inspectionReport.engine,
        },
        {
            name: "Air Conditioning",
            rating: item?.inspectionReport.ac,
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

    return (
        <Row className="vehicle-wrapper mb-3" justify='space-between'>
            <Col>
                <Row>
                    <Col>
                        <img src={item.viewableLink} className="image-wrapper-2" />
                    </Col>
                    <Col className = "ml-4" style={{alignSelf: "center"}}>
                        <div className='text-wrap'>
                            <HomeOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Make: </span> {item.make}</h3>
                        </div>
                        <div className='text-wrap'>
                            <CarOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Model: </span> {item.model}</h3>
                        </div>
                        <div className='text-wrap'>
                            <DashboardOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Mileage: </span> {`${item.mileage} km`}</h3>
                        </div>
                        <div className='text-wrap'>
                            <DollarOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Cost: </span> {item.cost}</h3>
                        </div>
                        <div className='text-wrap'>
                            <BranchesOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Transmission: </span> {TRANSMISSION_ENUMS[item.transmissionType]}</h3>
                        </div>
                        <div className='text-wrap'>
                            <CalendarOutlined className='car-icons' />
                            <h3 className='margin-0'><span className='car-detail-text'>Year: </span> {item.year}</h3>
                        </div>
                    </Col>
                </Row>
            </Col>

            <ResponsiveContainer
                width={"50%"}
                height={30 * inspectionReportData.length}
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
    )
}

export default VehicleCard