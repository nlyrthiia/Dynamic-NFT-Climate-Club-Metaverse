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
  // `function childNFTs() view returns(${nftInfo}[] memory)`,
  `function mintedTokenIds() view returns (uint256[] memory)`
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

export const getAllNFTs = async() => {
  let results = [...initialNFTs.map(nft => ({...nft, cot: 8000, neutralized: false}))]
  try {
    let _ids = await contract.mintedTokenIds();
    if (_ids) {
      let ids = _ids.map(_id => _id && _id.toNumber())
      for (let i = 0; i < ids.length; i++) {
        let tokenId = ids[i];
        const nftInfo = await getNFTInfo(tokenId);
        results[tokenId - 1] = {...nftInfo};
      }
    }
    return results;
  }catch(e) {
    console.log(e)
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
    if (tokenIds) {
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
    console.log(e)
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
