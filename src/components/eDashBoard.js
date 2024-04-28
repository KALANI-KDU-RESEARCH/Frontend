import React from "react";
import GoogleTrends from "./helpers/GoogleTrends";
import Header from "./Header";

const EDashBoard = () => {
  return (
    <div>
      <Header />
      <div id="widget" className="grid md:grid-cols-2 gap-10">
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