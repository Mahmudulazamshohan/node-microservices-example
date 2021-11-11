import React, { FormEvent, useState } from "react";
export interface IBoardListCard extends React.HTMLAttributes<HTMLDivElement> {}
export const BoardListCard: React.FC<IBoardListCard> = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div className="board--list--card">
      <button
        className="button"
        onClick={(e: FormEvent<HTMLButtonElement>) => {
          setCounter(counter + 1);
        }}
      >
        abcd
      </button>
      <div className="counter">{counter}</div>
    </div>
  );
};
