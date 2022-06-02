import { ethers } from "ethers"
import { toast } from "react-toastify"

import { initialNFTs, collections } from "./data"

const contractAddress = collections.Briquettes.contractAddress
const initialNFTAmount = 100

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const nftInfo =
  "(string imageUrl,string background,string wing,string body,string hat,string eye,string sdg,uint256 cot,bool )"

const contractAbi = [
  `function split(uint256 tokenId, ${nftInfo}[] memory nftArray)`,
  `function neutralize(uint256 tokenId)`,
  `function mint(uint256 tokenId, address to, ${nftInfo} memory nftInfo)`,
  `function getNFTInfo(uint256 tokenId) view returns (${nftInfo} memory nftInfo)`,
  `function ownerOf(uint256 tokenId) view returns (address)`,
  `function getTokensOfAddress(address _sender) view returns (uint256[] memory)`,
  `function childNFTs() view returns(${nftInfo}[] memory)`,
]

const contract = new ethers.Contract(contractAddress, contractAbi, signer)

export const getOwner = async (tokenId) => {
  try {
    const owner = await contract.ownerOf(tokenId)
    return owner
  } catch (e) {
    return null
  }
}

export const getAllNFTs = async () => {
  let results = []
  try {
    for (let i = 1; i <= initialNFTAmount; i++) {
      const nftInfo = await getNFTInfo(i)
      if (!nftInfo.imageUrl) {
        results.push(initialNFTs[i - 1])
      } else {
        results.push(nftInfo)
      }
    }
    const childNFTs = await getChildNFTInfos()
    results = [...results, ...childNFTs]
    return results
  } catch (e) {
    console.log(e)
  }
}

export const getChildNFTInfos = async () => {
  try {
    const childNFTInfos = await contract.childNFTs()
    if (childNFTInfos.length) {
      const infos = childNFTInfos.map((info, index) => ({
        tokenId: initialNFTAmount + index + 1,
        background: info[1],
        wing: info[2],
        body: info[3],
        hat: info[4],
        eye: info[5],
        sdg: info[6],
        imageUrl: info[0].substring(5),
        cot: info[7].toNumber(),
        neutralized: info[8],
      }))
      return infos
    }
    return null
  } catch (e) {
    // toast.error("Failed to get child NFTs");
  }
}

export const getNFTInfo = async (tokenId) => {
  const nftInfo = await contract.getNFTInfo(tokenId)
  return {
    imageUrl: nftInfo[0].substring(5),
    background: nftInfo[1],
    wing: nftInfo[2],
    body: nftInfo[3],
    hat: nftInfo[4],
    eye: nftInfo[5],
    sdg: nftInfo[6],
    cot: nftInfo[7].toNumber(),
    neutralized: nftInfo[8],
  }
}

export const getNFTsOfUser = async (address) => {
  try {
    let results = []
    const tokenIds = await contract.getTokensOfAddress(address)
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i]
      const nftInfo = await getNFTInfo(tokenId)
      results.push({
        tokenId: tokenId.toNumber(),
        contractAddress,
        imageUrl: nftInfo.imageUrl,
        background: nftInfo.background,
        wing: nftInfo.wing,
        body: nftInfo.body,
        hat: nftInfo.hat,
        eye: nftInfo.eye,
        sdg: nftInfo.sdg,
        cot: nftInfo.cot,
        neutralized: nftInfo.neutralized,
      })
    }
    return results
  } catch (e) {
    toast.error("Error getting NFTs of user")
    toast.clearWaitingQueue()
  }
}

export const neutralize = async (tokenId) => {
  const tx = await contract.neutralize(tokenId)
  await tx.wait()
}

export const splitNFT = async (tokenId, nftArray) => {
  const arweave_prefix = "ar://"
  nftArray.forEach((nft) => (nft.imageUrl = arweave_prefix + nft.imageUrl))
  try {
    const tx = await contract.split(tokenId, nftArray)
    await tx.wait()
    toast.success(`Successfully split NFT #${tokenId}`)
  } catch (e) {
    toast.error(`Error splitting NFT #${tokenId}`)
  }
}

export const mintNFT = async (tokenId, nftInfo) => {
  const arweave_prefix = "ar://"
  nftInfo.imageUrl = arweave_prefix + nftInfo.imageUrl
  nftInfo.cot = 8000
  nftInfo.neutralize = false
  try {
    const tx = await contract.mint(tokenId, signer.getAddress(), nftInfo)
    await tx.wait()
    toast.success(`Successfully mint NFT`)
  } catch (e) {
    toast.error("Transaction failed")
  }
}
