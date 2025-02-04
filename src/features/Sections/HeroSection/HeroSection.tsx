import React from "react";
import "./index.css";
import { useAppSelector } from "../../../utils/hooks";

const HeroSection = () => {
  const { query } = useAppSelector((state) => state.search);

  return (
    <React.Fragment>
      <div className="hero">
        <h1>
          <span className="hero-tag">bmym</span> brings you the all time
          favourite movies and shows ...
        </h1>
      </div>
      <h4 style={{ margin: "24px 10px" }}>
        {query && `Results for: ${query}`}
      </h4>
    </React.Fragment>
  );
};

export default HeroSection;
