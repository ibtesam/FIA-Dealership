import {Layout} from "antd";
import React from "react";

import {useGetDetails} from "../../ApiService/authQueries";
import Routes from "../../Routes";
import {TopBar, Sidebar, Footer, FullPageLoader} from "../../Components";
import "../../index.css";

const {Content} = Layout;

const MainApp = props => {
  const {data, isLoading} = useGetDetails({
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const renderRoutes = () => {
    if (isLoading) {
      return <FullPageLoader className2={"main-app-loader"} />;
    } else {
      return <Routes />;
    }
  };

  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        <TopBar />
        <Content className={`gx-layout-content justify-between`} id="layout">
          {renderRoutes()}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default MainApp;
