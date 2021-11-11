import React from "react";
import ContentLoader from "react-content-loader";
interface IBoardSkeletonLoader {
  width?: number;
  heading?: { width: number; height: number };
  row?: number;
  column?: number;
  padding?: number;
  borderRadius?: number;
}

const BoardSkeletonLoader: React.FC<IBoardSkeletonLoader> = ({
  width = window.innerWidth,
  heading = { width: 50, height: 12 },
  row = 3,
  column = 5,
  padding = 12,
  borderRadius = 4,
  ...props
}: IBoardSkeletonLoader) => {
  const list = [];
  let height;

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = 270;

      const x = padding + j * (itemWidth + padding);

      const height1 = itemWidth;

      const height2 = 20;

      const height3 = 20;

      const space =
        padding +
        height1 +
        (padding / 2 + height2) +
        height3 +
        padding * 4;

      const y1 =
        padding + heading.height + padding * 2 + space * (i - 1);

      const y2 = y1 + padding + height1;

      const y3 = y2 + padding / 2 + height2;

      list.push(
        <>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect
            x={x}
            y={y2}
            rx={0}
            ry={0}
            width={itemWidth}
            height={height2}
          />
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </>
      );

      if (i === row) {
        height = y3 + height3;
      }
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      {...props}
    >
      {list}
    </ContentLoader>
  );
};
export default BoardSkeletonLoader;
