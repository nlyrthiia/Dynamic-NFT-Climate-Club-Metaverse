import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ background, slug }) => {
  return (
    <div
      className="w-[300px] h-[300px] rounded-xl p-10 cursor-pointer"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Link to={slug} />
    </div>
  );
};

export default CollectionCard;
