import { Button, Col, Divider, Input, Row, Select } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";

/* eslint-disable */
import { ProjectList } from "../components/project/project.list";
/* eslint-disable */
const { Search } = Input;
const { Option } = Select;

const HomePage: React.FC = () => {
  const handleChange = (value: string[]) => {
    console.log(value);
  };
  return (
    <div>
      <h2>Projects</h2>
      <Row>
        <Col span="3">
          {" "}
          <Search placeholder="input search text" style={{ width: "100" }} />
        </Col>
        <Col span="6">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            defaultValue={["china"]}
            onChange={handleChange}
            optionLabelProp="label"
          >
            <Option value="china" label="China">
              <div className="demo-option-label-item">
                <span role="img" aria-label="China">
                  🇨🇳
                </span>
                China (中国)
              </div>
            </Option>
            <Option value="usa" label="USA">
              <div className="demo-option-label-item">
                <span role="img" aria-label="USA">
                  🇺🇸
                </span>
                USA (美国)
              </div>
            </Option>
            <Option value="japan" label="Japan">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Japan">
                  🇯🇵
                </span>
                Japan (日本)
              </div>
            </Option>
            <Option value="korea" label="Korea">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Korea">
                  🇰🇷
                </span>
                Korea (韩国)
              </div>
            </Option>
          </Select>
        </Col>
        <Col span="15">
          <Button type="primary" style={{ float: "right" }}>
            Create Project
          </Button>
        </Col>
      </Row>

      <Divider />

      <ProjectList />
    </div>
  );
};
export default withRouter(HomePage);
