import collection_b from "./assets/Briquettes.webp";
import collection_c from "./assets/CandyTree.webp";
import collection_f from "./assets/WaterRabbit.webp";
import collection_e from "./assets/PunkChef.webp";
import collection_a from "./assets/Bottle.webp";
import collection_d from "./assets/Hot-potMan.webp";

export const nfts = [];

export const collections = {
  Bottle: {
    contractAddress: "0x0",
    background: collection_a,
    title: "Greentech Emissions Reductions",
    creator: "Feijie",
    cot: 100,
  },
  Briquettes: {
    contractAddress: "0x0",
    background: collection_b,
    title: "Sichuan Biogas Stove Development Programme",
    creator: "Feijie",
    cot: "800,000",
  },
  "Candy Tree": {
    contractAddress: "0x00",
    background: collection_c,
    creator: "Feijie",
    title: "Greentech Emissions Reductions",
    cot: 100,
  },
  "Hot-pot Man": {
    contractAddress: "0x0",
    background: collection_d,
    creator: "Felix",
    title: "Solar Cooking for Refugee Families in Chad",
    cot: 100,
  },
  "Punk Chef": {
    contractAddress: "0x0",
    background: collection_e,
    creator: "Feijie",
    title: "Improved cookstoves in Maputo city, Mozambique",
    cot: 100,
  },
  "Water Rabbit": {
    contractAddress: "0x0",
    background: collection_f,
    creator: "Feijie",
    title: "Lango Safe Water Project",
    cot: 100,
  },
};
