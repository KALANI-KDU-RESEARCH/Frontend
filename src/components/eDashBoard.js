import React from "react";
import GoogleTrends from "./helpers/GoogleTrends";

const EDashBoard = () => {
  return (
    <div>
      EDashBoard
      <div id="widget">
        <GoogleTrends
          type="TIMESERIES"
          keyword="Coding"
          url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
        />
        <GoogleTrends
          type="GEO_MAP"
          keyword="Coding"
          url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
        />
      </div>
    </div>
  );
};

export default EDashBoard;