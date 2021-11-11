import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Menu, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  BugOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Logo from "../trans_logo.svg";
const { SubMenu } = Menu;
const AppLayouts: React.FC = ({ children }) => {
  const [current, setCurrent] = useState<string>("jira");
  const history = useHistory();

  const [breadcrumbPath, setBreadCrumbPath] = useState<string>(
    history.location.pathname.replaceAll("/", " ").toUpperCase()
  );

  useEffect(() => {
    history.listen((location) => {
      console.log("location", location);
      document.title = location.pathname
        .replaceAll("/", " ")
        .toUpperCase();
      setBreadCrumbPath(
        location.pathname.replaceAll("/", " ").toUpperCase()
      );
    });
  }, [history.location]);

  return (
    <div className="app--root">
      <Menu
        onClick={(e: any) => {
          setCurrent(e.key);
        }}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="jira">
          <Link to="/">
            <img src={Logo} style={{ width: "40px" }} />
          </Link>
        </Menu.Item>

        <SubMenu key="SubMenu" title={"Your works"}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="COLLABORATORS" title={"YOUR COLLABORATORS"}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <Link to="/drag-page">
            Board <FontAwesomeIcon icon={faChevronCircleDown} />
          </Link>
        </Menu.Item>
      </Menu>

      <Row>
        <Col span={3}>
          <div className="app--sidebar">
            <Menu
              style={{ width: "100%" }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <SubMenu
                key="sub2"
                icon={<AppstoreOutlined />}
                title="Roadmap"
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<SettingOutlined />}
                title="Navigation Three"
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
              <Menu.Item icon={<LineChartOutlined />} key="13">
                Reports
              </Menu.Item>
              <Menu.Item icon={<BugOutlined />} key="14">
                Issues
              </Menu.Item>
              <Menu.Item icon={<SettingOutlined />} key="15">
                Project Settings
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col span={21}>
          <div className="layout">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">{breadcrumbPath}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(AppLayouts);
