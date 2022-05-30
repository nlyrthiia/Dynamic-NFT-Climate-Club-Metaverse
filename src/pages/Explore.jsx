import React from "react";

import { CollectionCard } from "../components";
import bg from "../assets/bg.png";
import { collections } from "../data";

const explore = () => {
  return (
    <div
      className="h-[calc(100vh-100px)] pt-20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-6xl text-center font-bold mb-24">
          Explore Collections
        </h1>
        <div className="w-[1000px] h-[600px] mx-auto grid grid-rows-2 grid-cols-3 gap-10">
          {Object.entries(collections).map((collection, index) => (
            <CollectionCard
              key={index}
              name={collection[0]}
              {...collection[1]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default explore;
