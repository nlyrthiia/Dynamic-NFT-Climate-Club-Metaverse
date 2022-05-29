import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({
  background,
  contractAddress,
  name,
  creator,
  title,
  cot,
}) => {
  return (
    <Link to={`/assets/${contractAddress}`} className="relative text-white">
      <div
        className="w-[300px] h-[300px] rounded-xl p-10 cursor-pointer flex flex-col justify-center items-center gap-2"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(120, 120, 120, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-4xl">{name}</h2>
        <p className="text-xs">Create by {creator}</p>
        <h3 className="text-sm text-center">{title}</h3>
      </div>
      <div className="absolute bottom-2 right-4 text-[10px]">
        total market cap : {cot}T
      </div>
    </Link>
  );
};

export default CollectionCard;
