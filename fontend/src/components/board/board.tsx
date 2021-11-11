import React from "react";
export interface IBoard extends React.HTMLAttributes<HTMLDivElement> {}
const Board: React.FC<IBoard> = ({ children }) => {
  return <div className="board">{children}</div>;
};
export default Board;
