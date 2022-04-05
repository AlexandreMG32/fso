import React from "react";

const Info = ({ message, type }) => {
  return <div className={type}>{message}</div>;
};

export default Info;
