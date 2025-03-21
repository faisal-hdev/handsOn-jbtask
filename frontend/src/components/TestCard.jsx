import React from "react";
const TestCard = ({ event }) => {
  console.log(event);

  return (
    <div className="bg-red-200">
      <h1>{event.title}</h1>
    </div>
  );
};

export default TestCard;
