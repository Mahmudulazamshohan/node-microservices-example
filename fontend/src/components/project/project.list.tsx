import React from "react";
import { Col, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { EnumType } from "typescript";
import { Link } from "react-router-dom";
import { encodeGetQuery } from "../../utils/helpers";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

export interface IProjectProps {}

export type TFilters = {
  text: string;
  value: string;
  children?: TFilters[];
};

export type IData = {
  key?: string;
  name?: string;
  age: number;
  type: "Company-managed software" | "Team-managed software";
};

export interface IColumn {
  title: string;
  dataIndex: string;
  filters?: TFilters[];
  defaultSortOrder?: string;
  sortDirections?: string[];
  filterMultiple?: boolean;
  // Functions
  onFilter?: (value: any, record: any) => any;
  sorter?: (a: any, b: any) => any;
}

const columns: ColumnsType<IColumn> = [
  {
    title: "Name",
    dataIndex: "name",

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: any) =>
      record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => {
      return a.name.length - b.name.length;
    },
    sortDirections: ["descend"],
    render: (value: string) => {
      const query = encodeGetQuery({
        projectKey: value,
      });
      const uri = "/board/" + value + query;
      return <Link to={uri}>{value}</Link>;
    },
  },
  {
    title: "Key",
    dataIndex: "key",
    defaultSortOrder: "descend",
    // sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
  },
  {
    title: "Type",
    dataIndex: "type",

    onFilter: (value: any, record: any) =>
      record?.type.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.type.length - b.type.length,
  },
  {
    title: "Lead",
    dataIndex: "lead",
    render: (value: string) => {
      return (
        <Row>
          <Col span={4}>
            <Link to={"/" + value}>
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                S
              </Avatar>
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/" + value}>{value}</Link>
          </Col>
        </Row>
      );
    },
  },
];

const data: any = Array.from(Array(50)).map(
  (value: number, key: number) => {
    return {
      key,
      name: "Project" + key,
      age: Math.floor(Math.random() * key),
      type:
        key % 2
          ? "Team-managed software"
          : "Company-managed software",
      lead: "Shohan",
    };
  }
);

function onChange(
  pagination: any,
  filters: any,
  sorter: any,
  extra: any
) {
  console.log("params", pagination, filters, sorter, extra);
}

export const ProjectList: React.FC<IProjectProps> = () => {
  return (
    <Table columns={columns} dataSource={data} onChange={onChange} />
  );
};
