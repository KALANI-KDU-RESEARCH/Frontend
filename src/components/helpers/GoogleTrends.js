// GoogleTrends.js

import React, { useEffect, useRef, useState } from "react";
import Script from "react-load-script";

export default function GoogleTrends({ type, keyword, url, geo }) {
  const UrlRef = useRef('');
  UrlRef.current = `q=${encodeURI(keyword)}&geo=${geo}&date=today 12-m`;

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
        exploreQuery: UrlRef.current,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = (_) => {
    return <Script url={url} onLoad={handleScriptLoad} />;
  };

  return <div className="googleTrend" key={geo}>{renderGoogleTrend()}</div>;
}