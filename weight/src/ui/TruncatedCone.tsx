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
      {/* Left Ellipse */}
      <ellipse
        cx={leftEllipseCx}
        cy={commonCy}
        rx={rLeftX}
        ry={rLeftY}
        fill="#eee" // Assuming left is analogous to 'top' from vertical orientation
        stroke="#888"
        strokeWidth="1"
      />
      {/* Right Ellipse */}
      <ellipse
        cx={rightEllipseCx}
        cy={commonCy}
        rx={rRightX}
        ry={rRightY}
        fill="#ccc" // Assuming right is analogous to 'bottom' from vertical orientation
        stroke="#888"
        strokeWidth="1"
      />

      {/* 무게중심 위치 표시 */}
      {z !== undefined && (
        <>
          {/* 무게중심 위치에 원 표시 */}
          <circle
            cx={leftEllipseCx + z}
            cy={commonCy}
            r={Math.max(8, Math.min(rLeftY, rRightY) / 5)}
            fill="red"
            stroke="#333"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* 무게중심 수직선 */}
          <line
            x1={leftEllipseCx + z}
            y1={commonCy - maxRY - 5}
            x2={leftEllipseCx + z}
            y2={commonCy + maxRY + 5}
            stroke="red"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.7"
          />
          {/* 무게중심 위치 라벨 */}
          <text
            x={leftEllipseCx + z}
            y={commonCy - maxRY - 10}
            textAnchor="middle"
            fill="#333"
            fontWeight="bold"
            fontSize="12"
          >
            현재 무게중심
          </text>
        </>
      )}

      {/* 'L' Text on Left Ellipse */}
      <text
        x={leftEllipseCx}
        y={commonCy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#333"
        fontWeight="bold"
        fontSize={Math.max(rLeftY / 3, 12)} // 적절한 크기의 폰트 크기 (최소 12px)
      >
        L
      </text>
      {/* 'R' Text on Right Ellipse */}
      <text
        x={rightEllipseCx}
        y={commonCy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#333"
        fontWeight="bold"
        fontSize={Math.max(rRightY / 3, 12)} // 적절한 크기의 폰트 크기 (최소 12px)
      >
        R
      </text>
      {/* Top connecting line */}
      <line
        x1={leftEllipseCx} // Center X of left ellipse
        y1={commonCy - rLeftY} // Top edge of left ellipse
        x2={rightEllipseCx} // Center X of right ellipse
        y2={commonCy - rRightY} // Top edge of right ellipse
        stroke="#888"
        strokeWidth="1"
      />
      {/* Bottom connecting line */}
      <line
        x1={leftEllipseCx} // Center X of left ellipse
        y1={commonCy + rLeftY} // Bottom edge of left ellipse
        x2={rightEllipseCx} // Center X of right ellipse
        y2={commonCy + rRightY} // Bottom edge of right ellipse
        stroke="#888"
        strokeWidth="1"
      />
    </svg>
  );
};

