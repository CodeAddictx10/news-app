import React from "react";

const Loader: React.FC<{ fill?: string }> = ({ fill }: { fill?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <path
        d="M9 1V3.28571M14.7143 3.28571L13 5M3.28571 3.28571L5 5M9 17V14.7143M14.7143 14.7143L13 13M3.28571 14.7143L5 13M1 9H3.28571M14.7143 9H17"
        stroke={fill || "#fff"}
        strokeWidth="1.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Loader;
