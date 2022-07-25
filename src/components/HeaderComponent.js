import React from "react";
import "./HeaderComponent.css";

function HeaderComponent({ currencies }) {
  return (
    <div className="HeaderComponent">
      <p>1 USD = {parseFloat(1 / currencies["EUR"]).toFixed(2)} UAH</p>
      <p>1 EUR = {parseFloat(1 / currencies["USD"]).toFixed(2)} UAH</p>
    </div>
  );
}

export default HeaderComponent;
