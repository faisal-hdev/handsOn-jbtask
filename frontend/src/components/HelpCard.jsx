import React from "react";

const HelpCard = ({ helpItem }) => {
  return (
    <div>
      <h1 className="bg-red-200">{helpItem.title}</h1>
    </div>
  );
};

export default HelpCard;
