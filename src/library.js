import { ethers } from "ethers";
import { toast } from "react-toastify";

const contractAddress = "0xE813dc876Ce3882543CB6B2F1Cb39A7AEF29C31D";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const nftInfo =
  "(string background,string wing,string body,string hat,string eye,string sdg,string imageUrl,uint256 cot,bool neutralized)";

const contractAbi = [
  `function split(uint256 tokenId, ${nftInfo}[] memory nftArray)`,
  `function neutralize(uint256 tokenId, string memory imageUrl)`,
  `function mint(uint256 tokenId, address to, ${nftInfo} memory nftInfo)`,
  `function getNFTInfo(uint256 tokenId) view returns (${nftInfo} memory nftInfo)`,
  `function ownerOf(uint256 tokenId) view returns (address)`,
  `function getTokensOfAddress(address _sender) view returns (uint256[] memory)`,
];

const contract = new ethers.Contract(contractAddress, contractAbi, signer);

export const getOwner = async (tokenId) => {
  try {
    const owner = await contract.ownerOf(tokenId);
    return owner;
  } catch (e) {
    return null;
  }
};

export const getNFTInfo = async (tokenId) => {
  const nftInfo = await contract.getNFTInfo(tokenId);
  return nftInfo;
};

export const getNFTsOfUser = async () => {
  try {
    let results = [];
    const tokenIds = await contract.getTokensOfAddress(signer.getAddress());
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];
      const nftInfo = await getNFTInfo(tokenId);
      results.push({
        tokenId: tokenId.toNumber(),
        contractAddress,
        imageUrl: nftInfo[6],
        background: nftInfo[0],
        wing: nftInfo[1],
        body: nftInfo[2],
        hat: nftInfo[3],
        eye: nftInfo[4],
        sdg: nftInfo[5],
        cot: nftInfo[7].toNumber(),
        neutralized: nftInfo[8],
      });
    }
    return results;
  } catch (e) {
    toast.error("Error getting NFTs of user");
  }
};

export const neutralize = async (tokenId, imageUrl) => {
  const tx = await contract.neutralize(tokenId, imageUrl);
  await tx.wait();
  toast.success("Neutralized!");
};

export const splitNFT = async (tokenId, nftArray) => {
  try {
    const tx = await contract.split(tokenId, nftArray);
    await tx.wait();
    toast.success(`Successfully split NFT #${tokenId}`);
  } catch (e) {
    toast.error(`Error splitting NFT #${tokenId}`);
  }
};

export const mintNFT = async (tokenId, nftInfo) => {
  try {
    const tx = await contract.mint(tokenId, signer.getAddress(), nftInfo);
    await tx.wait();
    toast.success(`Successfully mint NFT`);
  } catch (e) {
    toast.error("Transaction failed");
  }
};
