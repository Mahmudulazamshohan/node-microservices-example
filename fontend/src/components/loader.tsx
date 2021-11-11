import { Col, Progress, Row } from "antd";
import React from "react";
import Logo from "../teams.svg";

export interface ILoader {
  progress: number;
}

export const Loader: React.FC<ILoader> = ({ progress }) => {
  return (
    <div style={{ height: "100%" }}>
      <Row
        justify="center"
        align="middle"
        style={{ height: "calc(100vh - 0px)" }}
      >
        <Col span={12}>
          <Row justify="center" align="middle">
            <img src={Logo} style={{ width: "100px" }} />
          </Row>
          <Progress percent={progress} size="small" />
        </Col>
      </Row>
    </div>
  );
};
