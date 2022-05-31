import { atom } from "recoil";

export const ownedNFTsState = atom({
  key: "ownedNFTsState",
  default: [],
});

export const allNFTState = atom({
  key: "initialNFTState",
  default: [],
});
