import React from "react";
import {Col, Row, Space, Table, Input, Form, Button} from "antd";

import "./index.css";

const GridView = props => {
  const {Search} = Input;

  return (
    <div className={props?.tableKey}>
      {!props?.tabKey ? (
        <Row
          className="space-align-block gx-m-0"
          type="flex"
          justify="space-between"
          align="middle"
        >
          {props?.onSearch && (
            <Col
              className="gx-col-grid gx-mb-0 gx-p-0"
              sm={24}
              xs={24}
              md={8}
              xl={5}
              lg={5}
            >
              <Space direction="vertical" align="center">
                <Col>
                  <Form.Item required={false} name="search" className="gx-m-0">
                    <Search
                      placeholder="Search..."
                      onSearch={searchText => props?.onSearch(searchText)}
                      allowClear
                      enterButton
                      className="search-box search-btn"
                    />
                  </Form.Item>
                </Col>
              </Space>
            </Col>
          )}
          {props?.buttonTitle &&
            <div className="btn-wrapper">
              <Button
                className="gx-font-weight-medium"
                type="primary"
                onClick={props?.onButtonClick}
              >
                {props?.buttonTitle}
              </Button>
            </div>
          }
        </Row>
      ) : null}
      <Table
        loading={props?.isFetching}
        className="gx-table-header-color ant-table-border"
        rowKey={props?.rowKey}
        style={{
          float: "center",
        }}
        columns={props.columns}
        tableLayout={props.tableLayout ? props.tableLayout : "fixed"}
        dataSource={props?.data}
        pagination={true}
        scroll={{x: 400}}
      />
    </div>
  );
};

export default GridView;
