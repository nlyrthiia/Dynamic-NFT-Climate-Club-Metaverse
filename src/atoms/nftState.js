import { atom } from "recoil"
import { initialNFTs } from "../data"
export const ownedNFTsState = atom({
  key: "ownedNFTsState",
  default: [],
})

export const allNFTState = atom({
  key: "allNFTState",
  default: [...initialNFTs],
})
