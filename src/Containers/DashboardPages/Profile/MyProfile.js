import {Avatar, Col, Row, Tabs} from "antd";
import React from "react";
import {useGetProfile} from "../../../ApiService/authQueries";
import placeHolderImage from "../../../Assets/placeholder-img.png";
import AuthService from "../../../Utils/auth.service";
import "./index.css";
import PasswordManagement from "./PasswordManagement";
import Profile from "./Profile";
import Widget from "./Widget";
// import PasswordManagement from './ResetPassword';

const {TabPane} = Tabs;

const MyProfile = () => {
  const {data: userProfile, isLoading} = useGetProfile();
  const userData = AuthService.getUserInfo();
  const user = {...userProfile, ...userData};
  return (
    <div className="main-content-wrapper">
      <div className="profile-container">
        <div className="profile-pic-wrapper">
          <div className="profile-avatar">
            <div className="avatar-upload">
              <Avatar
                className="size-150"
                alt="..."
                src={user?.mediaUrl ? user?.mediaUrl : placeHolderImage}
              />
            </div>
          </div>
          <div className="gx-profile-banner-avatar-info">
            <h2 className="profile-name">
              {user ? `${user?.firstName} ${user?.lastName}` : "--"}
            </h2>
            <p className="profile-email">{user ? `${user?.userName}` : "--"}</p>
          </div>
        </div>
      </div>
      <Row>
        <Col xl={16} lg={14} md={14} sm={24} xs={24}>
          <Widget loading={isLoading} title="Profile" styleName="profile-card">
            <Profile user={user} />
          </Widget>
        </Col>
        <Col xl={8} lg={10} md={10} sm={24} xs={24}>
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Widget title="Password Management" styleName="profile-card">
                <PasswordManagement />
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MyProfile;
