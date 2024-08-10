import React from "react";

const Footer = () => {
  return (
    <div className="mt-5 text-center text-gray-400 text-xs mb-5">
      <p>
        &copy; {new Date().getFullYear()} Kalani Coporation. All rights
        reserved.
      </p>
    </div>
  );
};

export default Footer;
