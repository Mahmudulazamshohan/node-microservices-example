import { Checkbox, Divider, Input } from "antd";
import React, { useState } from "react";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  FileOutlined,
} from "@ant-design/icons";

export interface ITree {
  onChange?: (d: any) => void;
}

export const Tree: React.FC<ITree> = ({ children, onChange }: any) => {
  return (
    <>
      {children.map((c: any, key: number) => {
        return (
          <ul
            key={key}
            style={{
              ...(c.children.length > 0
                ? {
                    listStyleType: "none",
                    borderLeft: "1px dashed #F8E526",
                    marginBottom: "10px",
                  }
                : {
                    listStyleType: "none",
                    borderLeft: "1px dashed #F8E526",
                    marginBottom: "10px",
                  }),
            }}
          >
            <li>
              <div style={{ display: "flex" }}>
                {/* {c.isChecked ? (
                  c.children.length > 0 ? (
                    <CaretDownOutlined
                      onClick={() => {
                        onChange(c);
                      }}
                    />
                  ) : (
                    <FileOutlined />
                  )
                ) : (
                  <CaretRightOutlined
                    onClick={() => {
                      onChange(c);
                    }}
                  />
                )} */}
                <Checkbox
                  onChange={() => {
                    onChange(c);
                  }}
                  checked={c.isChecked}
                ></Checkbox>
                {/* <input
                  type="checkbox"
                  checked={c.isChecked}
                  onChange={() => {
                    onChange(c);
                  }}
                /> */}
                <p>{c.title}</p>
              </div>

              <div>
                {c.isChecked && c.children.length > 0 && (
                  <Tree children={c.children} onChange={onChange} />
                )}
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export const TreeList: React.FC = () => {
  const [list, setList] = useState<Ilist[]>([
    {
      title: "file-1",
      isChecked: true,
      children: [
        {
          title: "file-2",
          isChecked: true,
          children: [],
        },
        {
          title: "file-3",
          isChecked: false,
          children: [
            {
              title: "file-4",
              isChecked: true,
              children: [
                {
                  title: "file-5",
                  isChecked: true,
                  children: [
                    {
                      title: "file-6",
                      isChecked: true,
                      children: [],
                    },
                    {
                      title: "file-9",
                      isChecked: true,
                      children: [
                        {
                          title: "file-12",
                          isChecked: true,
                          children: [
                            {
                              title: "file-13",
                              isChecked: true,
                              children: [
                                {
                                  title: "file-14",
                                  isChecked: true,
                                  children: [
                                    {
                                      title: "file-15",
                                      isChecked: true,
                                      children: [
                                        {
                                          title: "file-16",
                                          isChecked: true,
                                          children: [
                                            {
                                              title: "file-17",
                                              isChecked: true,
                                              children: [
                                                {
                                                  title: "file-18",
                                                  isChecked: true,
                                                  children: [
                                                    {
                                                      title: "file-21",
                                                      isChecked: true,
                                                      children: [],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              title: "file-20",
                                              isChecked: true,
                                              children: [
                                                {
                                                  title: "file-22",
                                                  isChecked: true,
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  title: "file-7",
                  isChecked: true,
                  children: [
                    {
                      title: "file-8",
                      isChecked: true,
                      children: [
                        {
                          title: "file-128",
                          isChecked: true,
                          children: [
                            {
                              title: "file-129",
                              isChecked: true,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "file-9",
      isChecked: true,
      children: [],
    },
  ]);
  
  interface Ilist {
    title: string;
    isChecked: boolean;
    children: Ilist[];
  }

  const handleChange = (d: Ilist) => {
    /**
     * --------------------
     * @param updater
     * @param children
     * @param checkedList
     * @returns
     */
    const recursive = (updater: Ilist, children: any, checkedList: Ilist[]) => {
      return children.map((_child: any) => {
        if (updater.title === _child.title) {
          updater.isChecked = !updater.isChecked;
          return {
            ...updater,
            children:
              _child.children && Array.isArray(_child.children)
                ? recursive(updater, _child.children, checkedList)
                : null,
          };
        } else {
          return {
            ..._child,
            children:
              _child.children && Array.isArray(_child.children)
                ? recursive(updater, _child.children, checkedList)
                : null,
          };
        }
      });
    };

    var temp: Ilist[] = [];
    const flat = (l: Ilist[], t: Ilist[]) => {
      var i: number = 0;
      while (i < l.length) {
        t.push(l[i]);
        if (l[i] && l[i].children) {
          flat(l[i].children, t);
        }
        i++;
      }
    };

    flat(d.children, temp);

    setList(recursive(d, list, temp));
  };
  return (
    <div style={{ border: "1px solid #eee", padding: 10 }}>
      <h3>Treeview</h3>
      <Divider />
      <Tree children={list} onChange={handleChange} />
    </div>
  );
};
export default TreeList;
