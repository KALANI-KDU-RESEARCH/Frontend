// GoogleTrends.js

import React, { useEffect } from "react";
import Script from "react-load-script";

export default function GoogleTrends({ type, keyword, url, geo }) {

  const handleScriptLoad = (_) => {
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById("widget"),
      type,
      {
        comparisonItem: [{ keyword, geo: geo, time: "today 12-m" }],
        category: 0,
        property: "",
      },
      {
        exploreQuery: `q=${encodeURI(keyword)}&geo=${geo}&date=today 12-m`,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = (_) => {
    return <Script url={url} onLoad={handleScriptLoad} />;
  };

  useEffect(() => {
    console.log("USEEEFECT");
  }, [geo]);

  return <div className="googleTrend" key={geo}>{renderGoogleTrend()}</div>;
}