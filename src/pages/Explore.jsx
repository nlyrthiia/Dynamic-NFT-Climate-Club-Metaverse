import React from "react";

import { CollectionCard } from "../components";
import collection_b from "../assets/collectionB.webp";
import collection_c from "../assets/collectionC.webp";
import collection_d from "../assets/collectionD.webp";
import collection_e from "../assets/collectionE.webp";
import collection_f from "../assets/collectionA.webp";

const collections = {
  A: {
    contractAddress: "0x0",
    background: collection_b,
    title: "Greentech Emissions Reductions",
    creator: "F",
    cot: 100,
  },
  B: {
    contractAddress: "0x0",
    background: collection_c,
    title: "Sichuan Biogas Stove Development Programme",
    creator: "F",
    cot: 100,
  },
  C: {
    contractAddress: "0x0",
    background: collection_b,
    creator: "F",
    title: "Greentech Emissions Reductions",
    cot: 100,
  },
  D: {
    contractAddress: "0x0",
    background: collection_d,
    creator: "F",
    title: "Solar Cooking for Refugee Families in Chad",
    cot: 100,
  },
  E: {
    contractAddress: "0x0",
    background: collection_e,
    creator: "F",
    title: "Improved cookstoves in Maputo city, Mozambique",
    cot: 100,
  },
  F: {
    contractAddress: "0x0",
    background: collection_f,
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
        {Object.entries(collections).map((collection, index) => (
          <CollectionCard key={index} name={collection[0]} {...collection[1]} />
        ))}
      </div>
    </div>
  );
};

export default explore;
