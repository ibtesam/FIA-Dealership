import {Col, Layout, Menu, Row} from "antd";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {MAIN_SIDE_BAR_OPTIONS} from "../../Constants/Roles";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";

import {useLogout} from "../../ApiService/authQueries";
import LocalStorageService from "../../Services/local-storage.service";
import utilService from "../../Utils/utils.service";
import FullPageLoader from "../FullPageLoader";
import "./index.css";
import SessionStorageService from "../../Services/session-storage.service";
import AuthService from "../../Utils/auth.service";

const Sidebar = () => {
  const user = AuthService.getUserInfo();
  let sideBarOptions = MAIN_SIDE_BAR_OPTIONS[user?.roles[0]];
  const {SubMenu, Item} = Menu;
  const {Sider} = Layout;
  const {pathname} = useLocation();

  const {mutate: logoutUser, isLoading: isLoggingOut} = useLogout({onSuccess});

  function onSuccess() {
    LocalStorageService.clear();
    SessionStorageService.clear();
    utilService.redirectToLogin();
  }

  const renderSideBarOptions = props => {
    if (!props.sideBarOptions) {
      return;
    }
    return (
      <>
        {sideBarOptions.map((singleSidebarOption, indexOne) => {
          return (
            <>
              <Item
                key={`${singleSidebarOption.selectedOptionKey}-${indexOne}`}
              >
                <Link
                  to={singleSidebarOption.linkTo}
                  className="noirProRegular"
                >
                  <Row align="middle" className="gx-m-0">
                    <Col>
                      <span style={{fontWeight: 600}}>
                        {singleSidebarOption.text}
                      </span>
                    </Col>
                  </Row>
                </Link>
              </Item>
            </>
          );
        })}
        <Menu.Item key="logout">
          <span
            onClick={logoutUser}
            className="noirProRegular gx-text-white"
            style={{display: "flex", width: "100%"}}
          >
            <span style={{fontWeight: 600, width: "80%"}}>Logout</span>
            {isLoggingOut && <FullPageLoader className={"width-20"} />}
          </span>
        </Menu.Item>
      </>
    );
  };

  let selectedKeys = pathname;
  const defaultOpenKeys = selectedKeys.split("/")[0];

  return (
    <>
      <Sider
        className={`gx-app-sidebar`}
        trigger={null}
        collapsed={false}
        collapsible
      >
        <SidebarLogo />
        <div className="gx-sidebar-content sidebar-scroll custom-sidebar-scroll sider-height">
          <div className={`gx-sidebar-notifications`}>
            <UserProfile />
          </div>

          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            mode="inline"
            className="custom-sidebar-scroll"
          >
            {renderSideBarOptions({sideBarOptions: sideBarOptions})}
          </Menu>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
