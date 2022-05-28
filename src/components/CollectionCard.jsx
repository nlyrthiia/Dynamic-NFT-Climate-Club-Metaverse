import React from "react";

const CollectionCard = ({ background }) => {
  return (
    <div
      className="w-full h-full rounded-xl p-10"
      style={{ backgroundImage: `url(${background})` }}
    ></div>
  );
};

export default CollectionCard;
