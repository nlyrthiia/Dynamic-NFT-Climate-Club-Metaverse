import React from "react";

import { CollectionCard } from "../components";
import collection_b from "../assets/collectionB.png";
import collection_c from "../assets/collectionC.png";
import collection_d from "../assets/collectionD.png";
import collection_e from "../assets/collectionE.png";
import collection_f from "../assets/collectionA.png";

const collections = {
  A: {
    slug: "collection-a",
    background: collection_b,
    title: "Greentech Emissions Reductions",
    name: "A",
    creator: "F",
    cot: 100,
  },
  B: {
    slug: "collection-b",
    background: collection_c,
    name: "B",
    title: "Sichuan Biogas Stove Development Programme",
    creator: "F",
    cot: 100,
  },
  C: {
    slug: "collection-c",
    background: collection_b,
    name: "C",
    creator: "F",
    title: "Greentech Emissions Reductions",
    cot: 100,
  },
  D: {
    slug: "collection-d",
    background: collection_d,
    name: "D",
    creator: "F",
    title: "Solar Cooking for Refugee Families in Chad",
    cot: 100,
  },
  E: {
    slug: "collection-e",
    background: collection_e,
    name: "E",
    creator: "F",
    title: "Improved cookstoves in Maputo city, Mozambique",
    cot: 100,
  },
  F: {
    slug: "collection-f",
    background: collection_f,
    name: "F",
    creator: "F",
    title: "Lango Safe Water Project",
    cot: 100,
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
