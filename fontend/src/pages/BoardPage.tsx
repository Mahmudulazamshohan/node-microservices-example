import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  ResponderProvided,
} from "react-beautiful-dnd";

import BoardSkeletonLoader from "../components/board/board.skeleton.loader";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Menu, Tooltip } from "antd";
import BoardListDialog from "../components/board/board.list.dialog";

interface ICards {
  id: string;
  index: number;
  content: string;
}

interface IBoardList {
  id: string;
  index: number;
  name: string;
  boardCardList: ICards[];
}
function getBoardCards(row: number, column: number): IBoardList[] {
  var result: IBoardList[] = [];
  for (var i = 0; i < row; i++) {
    var temp: ICards[] = [];
    for (var j = 0; j < Math.floor(Math.random() * 25); j++) {
      temp[j] = {
        id: `item-${i}-${j}`,
        index: j,
        content: `Cards-${i}-${j}`,
      };
    }
    result[i] = {
      id: `board-${i}-${j}`,
      index: i,
      name: `Todo ${i}`,
      boardCardList: temp,
    };
  }
  return result;
}

interface IDroppableSource {
  droppableId: number;
  index: number;
}
interface IDroppableDestination {
  index: number;
  droppableId: number;
}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "#C0B6F2" : "#C0B6F2",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const DragPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [boardList, setBoardList] = useState(getBoardCards(5, 18));
  const [cloneBoardList, setCloneBoardList] = useState<IBoardList[]>(
    []
  );
  const [menuStyles, setMenuStyles] = useState<Object>({
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
  });
  // a little function to help us with reordering the result
  const reorder = (
    list: ICards[],
    startIndex: number,
    endIndex: number
  ) => {
    const result: Array<any> = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  /**
   * Moves an item from one list to another list.
   */
  const move = (
    source: ICards[],
    destination: ICards[],
    droppableSource: IDroppableSource,
    droppableDestination: IDroppableDestination
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return {
      sourceClone,
      destClone,
    };
  };

  const getList = (id: string) => {
    const board = cloneBoardList.find((b) => b.id === id);
    return board ? board.boardCardList : [];
  };

  const onDragEnd = (result: any, provided: ResponderProvided) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(destination.droppableId),
        source.index,
        destination.index
      );

      setCloneBoardList(
        cloneBoardList.map((board) => {
          if (board.id === destination.droppableId) {
            return {
              ...board,
              boardCardList: items,
            };
          } else {
            return board;
          }
        })
      );
    } else {
      const { sourceClone, destClone } = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setCloneBoardList(
        cloneBoardList.map((board) => {
          if (board.id === source.droppableId) {
            return {
              ...board,
              boardCardList: sourceClone,
            };
          } else if (board.id === destination.droppableId) {
            return {
              ...board,
              boardCardList: destClone,
            };
          } else {
            return board;
          }
        })
      );
    }
  };

  const getStyle = (style: any, snapshot: any) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.071s`,
    };
  };

  const handleIssueSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const queryValue = e.target.value;

    const result = boardList.map((board) => {
      var temp: ICards[] = board.boardCardList;
      if (board.boardCardList.length > 0 && queryValue.length > 0) {
        temp = board.boardCardList.filter((boardCard) => {
          return boardCard.content
            .toLowerCase()
            .includes(queryValue.toLowerCase());
        });
      }
      return {
        ...board,
        boardCardList: temp,
      };
    });

    setCloneBoardList(result);
  };
  const handleShowBoardListDialog = () => {
    setIsVisible(true);
  };
  const handleCancelBoardListDialog = () => {
    setIsVisible(false);
  };
  const handleOkBoardListDialog = () => {
    setIsVisible(false);
  };

  const [prevTarget, setPrevTarget] = useState<any>();

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setPrevTarget(e.target);

    setMenuStyles({
      display: "block",
      position: "fixed",
      top: e.screenY - 90,
      left: e.screenX,
    });
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== prevTarget) {
        setMenuStyles({
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          background: "red",
        });
      }
      //console.log(e);
    });
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setCloneBoardList(boardList);
  }, [boardList]);

  return (
    <>
      <div className="info--section">
        <h2 className="sprint--name">Sprint 1</h2>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
            }}
            className="s"
          >
            <Input.Search
              size="middle"
              placeholder=""
              onChange={handleIssueSearch}
            />
            <Avatar.Group>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>
                K
              </Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
            <Dropdown.Button
              onClick={(e) => {}}
              size="middle"
              overlay={
                <Menu>
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    1st menu item
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    2nd menu item
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UserOutlined />}>
                    3rd menu item
                  </Menu.Item>
                </Menu>
              }
            >
              Labels
            </Dropdown.Button>
          </div>
          <div></div>
        </div>
      </div>

      {isLoaded ? (
        <div className="board">
          <DragDropContext onDragEnd={onDragEnd}>
            {cloneBoardList.map((board, k1: React.Key) => {
              return (
                <Droppable key={k1} droppableId={board.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className="board--list"
                      onContextMenu={handleRightClick}
                    >
                      <div className="board--list--header">
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#555",
                          }}
                        >
                          {board.name}
                        </p>
                        <div className="action">
                          <Dropdown.Button
                            overlay={
                              <Menu>
                                <Menu.Item key="1">
                                  Set Column limit
                                </Menu.Item>
                                <Menu.Item key="2">Delete</Menu.Item>
                              </Menu>
                            }
                          ></Dropdown.Button>
                        </div>
                      </div>

                      <div>
                        {board.boardCardList.map(
                          (cardList, k2: number) => {
                            return (
                              <Draggable
                                key={cardList.id}
                                draggableId={cardList.id}
                                index={k2}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    key={k2}
                                    className="board--list--card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getStyle(
                                      provided.draggableProps.style,
                                      snapshot
                                    )}
                                  >
                                    <div className="header">
                                      <p
                                        className="header-title"
                                        onClick={
                                          handleShowBoardListDialog
                                        }
                                      >
                                        {cardList.content}
                                      </p>
                                      <div className="action">
                                        <Dropdown.Button
                                          overlay={
                                            <Menu
                                              onClick={(e) => {
                                                console.log(
                                                  e,
                                                  board,
                                                  cardList
                                                );
                                                if (
                                                  e.key === "delete"
                                                ) {
                                                  setBoardList(
                                                    boardList.map(
                                                      (b) => {
                                                        if (
                                                          board.id ===
                                                          b.id
                                                        ) {
                                                          const boardCardList =
                                                            board.boardCardList.filter(
                                                              (
                                                                card
                                                              ) => {
                                                                return (
                                                                  card.id !==
                                                                  cardList.id
                                                                );
                                                              }
                                                            );
                                                          return {
                                                            ...b,
                                                            boardCardList,
                                                          };
                                                        }
                                                        return b;
                                                      }
                                                    )
                                                  );
                                                }
                                              }}
                                            >
                                              <Menu.Item key="limit">
                                                Set Column limit
                                              </Menu.Item>
                                              <Menu.Item key="delete">
                                                Delete
                                              </Menu.Item>
                                            </Menu>
                                          }
                                        ></Dropdown.Button>
                                      </div>
                                    </div>
                                    <div className="main">
                                      <div className="main-label">
                                        {[1, 2].map((n) => (
                                          <Button
                                            key={n}
                                            type={
                                              n % 2
                                                ? "primary"
                                                : "default"
                                            }
                                            size={"small"}
                                          >
                                            Fontend
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </DragDropContext>
          <BoardListDialog
            isVisible={isVisible}
            onOk={handleOkBoardListDialog}
            onCancel={handleCancelBoardListDialog}
          />

          <div style={menuStyles} className="menu--context">
            <ul className="list">
              <li className="list--item">Add label</li>
              <li className="list--item">Remove flags</li>
              <li className="list--item">Copy issue link</li>
              <li className="list--item">Delete</li>
            </ul>
          </div>
        </div>
      ) : (
        <BoardSkeletonLoader />
      )}
    </>
  );
};
export default DragPage;
