import React from "react";
export interface IBoardList extends React.HTMLAttributes<HTMLDivElement> {
 
}
export const BoardList: React.FC<IBoardList> = ({ children }) => {
  return <div className="board--list">{children}</div>;
};
