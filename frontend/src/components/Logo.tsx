import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="font-display dark:text-white">
      <span className="text-black dark:text-white">The</span>
      <span className="text-red-1x">News</span>
    </Link>
  );
};

export default Logo;
