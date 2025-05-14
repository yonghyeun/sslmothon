import React from "react";

interface TruncatedConeProps extends React.SVGProps<SVGSVGElement> {
  radiusLeft: number;
  radiusRight: number;
  height: number;
  z?: number; // 무게중심 위치 (왼쪽에서부터의 거리)
}

export const TruncatedCone: React.FC<TruncatedConeProps> = ({
  radiusLeft,
  radiusRight,
  height, // This 'height' prop is now interpreted as the length of the horizontal cone
  z, // 무게중심 위치 (왼쪽에서부터의 거리)
  ...props
}) => {
  // Renaming for clarity within the function for horizontal orientation
  const length = height; // Original height prop is now length along X-axis
  const rLeftY = radiusLeft; // Radius of the left circular face along Y-axis
  const rRightY = radiusRight; // Radius of the right circular face along Y-axis

  const rLeftX = rLeftY / 3; // Squashed radius of the left face along X-axis (for 3D effect)
  const rRightX = rRightY / 3; // Squashed radius of the right face along X-axis (for 3D effect)

  const maxRY = Math.max(rLeftY, rRightY); // Max radius along Y-axis

  // Padding calculation (based on the maximum squashed radius along X-axis)
  const baseSquashedRadius = Math.max(rLeftX, rRightX);
  const padding = Math.max(10, Math.ceil(baseSquashedRadius) + 2);

  // SVG Dimensions
  // Total width needed for the cone content itself (ellipses + length between them)
  const svgContentWidth = rLeftX + length + rRightX;
  // Total height needed for the cone content itself (max diameter)
  const svgContentHeight = maxRY * 2;

  const svgWidth = svgContentWidth + 2 * padding;
  const svgHeight = svgContentHeight + 2 * padding;

  // Coordinates for rendering
  // Center X of the left ellipse
  const leftEllipseCx = padding + rLeftX;
  // Center X of the right ellipse
  const rightEllipseCx = padding + rLeftX + length;
  // Common Y coordinate for the centers of both ellipses (vertical center of SVG content)
  const commonCy = padding + maxRY;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      className="truncatedcone"
      {...props}
    >
      {/* 왼쪽 타원 */}
      <ellipse
        cx={leftEllipseCx}
        cy={commonCy}
        rx={rLeftX}
        ry={rLeftY}
        fill="#FFCCCC" // 더 밝고 강한 색상
        stroke="black" // 더 두껍고 뚜렷한 테두리
        strokeWidth="2"
      />
      {/* 오른쪽 타원 */}
      <ellipse
        cx={rightEllipseCx}
        cy={commonCy}
        rx={rRightX}
        ry={rRightY}
        fill="#CCCCFF" // 더 밝고 강한 색상
        stroke="black" // 더 두껍고 뚜렷한 테두리
        strokeWidth="2"
      />

      {/* 무게중심 위치 표시 */}
      {z !== undefined && (
        <>
          {/* 무게중심 위치에 사각형 표시 (원 대신 사각형 사용) */}
          <rect
            x={leftEllipseCx + z - 10}
            y={commonCy - 10}
            width="20"
            height="20"
            fill="red"
            stroke="black"
            strokeWidth="2"
          />
          {/* 무게중심 수직선 */}
          <line
            x1={leftEllipseCx + z}
            y1={commonCy - maxRY - 5}
            x2={leftEllipseCx + z}
            y2={commonCy + maxRY + 5}
            stroke="red"
            strokeWidth="3" // 더 두껍게
            strokeDasharray="5 5" // 더 큰 대시
          />
          {/* 무게중심 위치 라벨 */}
          <text
            x={leftEllipseCx + z}
            y={commonCy - maxRY - 15}
            textAnchor="middle"
            fill="blue" // 파란색으로 변경
            fontWeight="bold"
            fontSize="16" // 더 큰 글씨
            textDecoration="underline" // 밑줄 추가
          >
            무게중심
          </text>
        </>
      )}

      {/* 'L' 텍스트 */}
      <text
        x={leftEllipseCx}
        y={commonCy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="blue" // 색상 변경
        fontWeight="bold"
        fontSize={Math.max(rLeftY / 2, 16)} // 더 큰 폰트 크기
      >
        L
      </text>
      {/* 'R' 텍스트 */}
      <text
        x={rightEllipseCx}
        y={commonCy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="blue" // 색상 변경
        fontWeight="bold"
        fontSize={Math.max(rRightY / 2, 16)} // 더 큰 폰트 크기
      >
        R
      </text>
      {/* 위쪽 연결선 */}
      <line
        x1={leftEllipseCx}
        y1={commonCy - rLeftY}
        x2={rightEllipseCx}
        y2={commonCy - rRightY}
        stroke="black" // 검정색으로 변경
        strokeWidth="3" // 더 두껍게
      />
      {/* 아래쪽 연결선 */}
      <line
        x1={leftEllipseCx}
        y1={commonCy + rLeftY}
        x2={rightEllipseCx}
        y2={commonCy + rRightY}
        stroke="black" // 검정색으로 변경
        strokeWidth="3" // 더 두껍게
      />
    </svg>
  );
};

