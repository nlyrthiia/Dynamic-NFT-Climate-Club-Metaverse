import React from "react";
import { HeartIcon, EyeIcon } from "@heroicons/react/outline";

const GenerationCard = ({ generation, cot }) => {
  const level = cot < 10 ? "3" : cot < 50 ? "2" : "1";
  const imageUrl = `../assets/nft/lv${level}/02.webp`;
  return (
    <div className="rounded-xl shadow-md">
      <img src={imageUrl} alt="" />
      <div className="p-4 relative">
        <div className="flex flex-col">
          <p>Generation: {generation}</p>
          <p>COT: {cot}t</p>
        </div>
      </div>
    </div>
  );
};

export default GenerationCard;
