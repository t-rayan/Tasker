import React from "react";

interface CircularProgressProps {
  percentage: number;
  strokeWidth?: number;
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 10,
  strokeWidth = 8,
  size = 65,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className="inline-block"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        className="stroke-current text-gray-200"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="stroke-current text-blue-600"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={progress}
      />
      {/* <text
        className="text-gray-600 font-normal text-[.4rem] text-center"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {percentage}%
      </text> */}
    </svg>
  );
};

export default CircularProgress;
