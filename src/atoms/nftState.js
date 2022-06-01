import { atom } from "recoil"
import { initialNFTs } from "../data"

export const ownedNFTsState = atom({
  key: "ownedNFTsState",
  default: [],
})

export const allNFTState = atom({
  key: "allNFTState",
  default: [...initialNFTs.map(nft => ({...nft, cot: 8000, neutralized: false}))],
})
