import React from "react";
import "../Style/Button.scss";

const Button = ({ Title = "" }) => {
  return <button className="border-gradient">{Title}</button>;
};

export default Button;
