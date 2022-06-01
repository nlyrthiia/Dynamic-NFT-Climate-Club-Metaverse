import React, { useState, useEffect } from "react";

const GenerationCard = ({ generation, cot }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const level = cot < 10 ? "3" : cot < 50 ? "2" : "1";
    setImageUrl(require(`../assets/nft/lv${level}/02.webp`));
  }, [cot]);
  return (
    <div className="rounded-xl shadow-md overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="w-[300px] h-[300px] object-cover"
        />
      )}

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
