import React from "react";

import { CollectionCard } from "../components";
import collection_b from "../assets/collection-b.png";
import collection_c from "../assets/collection-c.png";
import collection_d from "../assets/collection-d.png";
import collection_e from "../assets/collection-e.png";
import collection_f from "../assets/collection-f.png";

const collections = {
  A: {
    slug: "collection-a",
    background: collection_b,
  },
  B: {
    slug: "collection-b",
    background: collection_b,
  },
  C: {
    slug: "collection-c",
    background: collection_c,
  },
  D: {
    slug: "collection-d",
    background: collection_d,
  },
  E: {
    slug: "collection-e",
    background: collection_e,
  },
  F: {
    slug: "collection-f",
    background: collection_f,
  },
};

const explore = () => {
  return (
    <div className="container mx-auto h-[calc(100vh-100px)] pt-20">
      <h1 className="text-6xl text-center font-bold mb-24">
        Explore Collections
      </h1>
      <div className="w-[1000px] h-[600px] mx-auto grid grid-rows-2 grid-cols-3 gap-10">
        {Object.values(collections).map((collection, index) => (
          <CollectionCard key={index} {...collection} />
        ))}
      </div>
    </div>
  );
};

export default explore;
