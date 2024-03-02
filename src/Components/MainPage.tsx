import React from "react";
import { Layout, Flex } from "antd";
import HeaderPg from "./HeaderPg";
import Footers from "./Footers";

const { Header, Footer, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "100%",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
  marginTop: 12,
  marginBottom: 12
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

interface MyProp {
  children: React.ReactNode;
}

const Main = ({ children }: MyProp) => (
  <Flex gap="middle" wrap="wrap">
    <Layout>
      <Header>
        <HeaderPg />
      </Header>
      <Content style={contentStyle}>{children}</Content>
      <Footer style={footerStyle}>
        <Footers />
      </Footer>
    </Layout>
  </Flex>
);

export default Main;
