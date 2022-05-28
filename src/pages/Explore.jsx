import React from "react";

import { CollectionCard } from "../components";
import collection_b from "../assets/collection-b.png";
import collection_c from "../assets/collection-c.png";
import collection_d from "../assets/collection-d.png";
import collection_e from "../assets/collection-e.png";
import collection_f from "../assets/collection-f.png";

const collections = {
  A: {
    background: collection_b,
  },
  B: {
    background: collection_b,
  },
  C: {
    background: collection_c,
  },
  D: {
    background: collection_d,
  },
  E: {
    background: collection_e,
  },
  F: {
    background: collection_f,
  },
};

const explore = () => {
  return (
    <div className="container mx-auto h-[calc(100vh-100px)] pt-20">
      <h1 className="text-6xl text-center font-bold mb-24">
        Explore Collections
      </h1>
      <div className="w-full h-[600px] grid grid-rows-2 grid-cols-3 gap-4">
        {Object.values(collections).map((collection, index) => (
          <CollectionCard key={index} {...collection} />
        ))}
      </div>
    </div>
  );
};

export default explore;
