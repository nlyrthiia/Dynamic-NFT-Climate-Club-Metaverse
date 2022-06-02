import React, { useContext, useState, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import { ChevronUpIcon, SearchIcon } from "@heroicons/react/outline"
import { toast } from "react-toastify"
import {
  PuzzleIcon,
  EyeIcon,
  HeartIcon,
  MailOpenIcon,
  ShoppingBagIcon,
  NewspaperIcon,
} from "@heroicons/react/outline"
import clsx from "clsx"
import { useRecoilState } from "recoil"

import { NFTListCard } from "../components"
import WalletContext from "../context/WalletContext"
import { collections } from "../data"
import avatar from "../assets/avatar.webp"
import polygonIcon from "../assets/polygon-icon.png"
import projectHead from "../assets/collection-head.webp"
import projectAvatar from "../assets/collection-logo.webp"
import bg from "../assets/bg.png"
import { ownedNFTsState, allNFTState } from "../atoms/nftState"
import { getNFTsOfUser, getAllNFTs } from "../library"

const Account = ({ address }) => {
  const { walletInfo } = useContext(WalletContext)
  const [ownedNFTs, setOwnedNFTs] = useRecoilState(ownedNFTsState)
  useEffect(() => {
    const getOwnedNFTs = async () => {
      const nfts = await getNFTsOfUser(walletInfo.address)
      if (nfts) {
        setOwnedNFTs([...nfts])
      }
    }
    getOwnedNFTs()
  }, [walletInfo.address, setOwnedNFTs])
  if (!address && !walletInfo.address) {
    toast.error("Please connect to your wallet.")
    toast.clearWaitingQueue()
    return <Navigate to="/" />
  }
  return (
    <>
      <div className="h-[200px] bg-[#d5f4ce] flex items-center justify-center">
        <img src={avatar} alt="" className="h-[70%] w-auto" />
      </div>
      <div className="py-12 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-bold">User Name</h1>
          <div className="flex items-center justify-center">
            <img src={polygonIcon} alt="" className="w-10 h-10" />
            <p className="font-semibold">{address ?? walletInfo.address}</p>
          </div>
          <p className="w-[1000px] text-sm text-justify">
            （BIO）The project team visits the low-income rural households to build biogas digesters
            and efficient biogas cookstoves for them. The digester tanks are fed with animal manure,
            previously just discharged into open pits, and convert it into clean and affordable
            biogas to be used conveniently for cooking, heating, or lighting instead of coal and
            firewood.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-around py-4 px-8 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-1">
          <ShoppingBagIcon className="w-6 h-6" />
          <p>Collections</p>
        </div>
        <div className="flex items-center justify-center gap-1 before:block before:absolute before:top-[40px] before:w-full before:h-[4px] before:bg-[#73c000] relative">
          <PuzzleIcon className="w-6 h-6" />
          <p>NFTs</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <HeartIcon className="w-6 h-6" />
          <p>Favorite</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <EyeIcon className="w-6 h-6" />
          <p>Watchlist</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <NewspaperIcon className="w-6 h-6" />
          <p>List</p>
        </div>
        <div className="flex items-center justify-center  gap-1">
          <MailOpenIcon className="w-6 h-6" />
          <p>Offers</p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="relative">
          <input
            type="text"
            className="w-[600px] rounded-lg p-3 border border-gray-200"
            placeholder="items, collections, COTs, accounts, etc."
          />
          <SearchIcon className="text-gray-400 w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-5 p-8 px-10 gap-8 mx-auto max-w-[1920px]">
        {ownedNFTs.map((nft, index) => (
          <NFTListCard
            key={index}
            cot={nft.cot}
            neutralized={nft.neutralized}
            imageUrl={nft.imageUrl}
            contractAddress={nft.contractAddress}
            tokenId={nft.tokenId}
          />
        ))}
      </div>
    </>
  )
}

const Project = ({ contractAddress }) => {
  const [allNFTs, setAllNFTs] = useRecoilState(allNFTState)

  useEffect(() => {
    const fetchAllNFTs = async () => {
      let nfts = await getAllNFTs()
      if (nfts) setAllNFTs(nfts)
    }
    fetchAllNFTs()
  }, [setAllNFTs])
  const [moreInfo, setMoreInfo] = useState(false)
  const [collectionName, collectionInfo] = Object.entries(collections).find(
    (c) => c[1].contractAddress === contractAddress,
  )
  return (
    <>
      <div
        className="w-full h-[400px] bg-no-repeat bg-top bg-cover relative"
        style={{ backgroundImage: `url(${projectHead})` }}
      >
        <img
          src={projectAvatar}
          alt=""
          className="h-[300px] w-auto absolute left-1/2 -translate-x-1/2 top-[100%] -translate-y-1/2"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center mt-40 gap-4 border-b border-gray-200 pb-6 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">{collectionName}</h1>
          <div className="flex items-center justify-center">
            <img src={polygonIcon} alt="" className="w-10 h-10" />
            <p className="text-[#f3c000]">
              <a
                href={`https://testnets.opensea.io/collection/briquettes-n52ioet6cr`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contractAddress}
              </a>
            </p>
          </div>
        </div>
        <p>
          Created By <span className="text-[#73c000]">{collectionInfo?.creator}</span>
        </p>
        <p className="text-lg font-semibold">{collectionInfo?.title}</p>
      </div>
      <div className="flex items-center justify-evenly py-3 border-b border-gray-200 text-sm bg-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Market Cap</p>
          <p className="text-2xl font-bold">100000$</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Highest Sale</p>
          <p className="text-2xl font-bold">100DAI</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Floor Price</p>
          <p className="text-2xl font-bold">10DAI</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Items</p>
          <p className="text-2xl font-bold">100</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Listed Items</p>
          <p className="text-2xl font-bold">60</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Owners</p>
          <p className="text-2xl font-bold">50</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Total Trending Volume </p>
          <p className="text-2xl font-bold">300</p>
        </div>
      </div>
      <div
        className={clsx(
          "overflow-hidden max-h-[500px] space-y-4 p-8 relative cursor-pointer transition-max-h duration-300 ease-in-out max-w-[1920px]",
          !moreInfo && "max-h-[200px]",
        )}
        onClick={() => setMoreInfo((prev) => !prev)}
      >
        <ChevronUpIcon
          className={clsx(!moreInfo && "rotate-180", "w-6 h-6 absolute right-8 bottom-0")}
        />
        <p className="font-bold">Sichuan Biogas Stove Development Programme</p>
        <p className="text-sm font-semibold">How does it work?</p>
        <p className="text-sm">
          The project team visits the low-income rural households to build biogas digesters and
          efficient biogas cookstoves for them. The digester tanks are fed with animal manure,
          previously just discharged into open pits, and convert it into clean and affordable biogas
          to be used conveniently for cooking, heating, or lighting instead of coal and firewood.
        </p>
        <p className="text-sm font-semibold">Why did we choose this project?</p>
        <p className="text-sm">
          The installation of a biogas digester to handle animal manure does not only reduce carbon
          dioxide emissions, but it also helps to improve rural living conditions in many different
          ways. After switching to biogas, the households’ disposable savings increased 40% due to
          saved energy and fertilizer expenditures, higher agricultural output, etc.
        </p>
        <p className="text-sm font-semibold">What is my impact?</p>
        <p className="text-sm">
          Each cookstove system built will be able to reduce 2 tons of carbon emission per year,
          with an average lifetime over 10 years with proper use and care. To date, this project has
          built cookstoves for 395,435 rural households and have reduced over 6 million tons of
          carbon emissions.
        </p>
        <p className="text-sm font-semibold">How do we verify the impact?</p>
        <p className="text-sm">
          This project has been independently verified in accordance with the Gold Standard for
          Global Goals. You can view at anytime the public project page and offset credit retirement
          history here. The Gold Standard is the globally recognized verification body that was
          established in 2003 by WWF and other international NGOs to ensure projects that reduced
          carbon emissions featured the highest levels of environmental integrity and also
          contributed to sustainable development.
        </p>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="relative">
          <input
            type="text"
            className="w-[600px] rounded-lg p-3 border border-gray-200"
            placeholder="items, collections, COTs, accounts, etc."
          />
          <SearchIcon className="text-gray-400 w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-5 p-8 px-10 gap-8 mx-auto max-w-[1920px]">
        {allNFTs &&
          allNFTs.map((nft, index) => {
            return (
              <NFTListCard
                key={index}
                cot={nft.cot}
                imageUrl={nft.imageUrl}
                neutralized={nft.neutralized}
                contractAddress={contractAddress}
                tokenId={index + 1}
              />
            )
          })}
      </div>
    </>
  )
}

const Collection = () => {
  const { address, contractAddress } = useParams()

  return (
    <div className="w-full min-h-screen">
      {!contractAddress ? (
        <Account address={address} />
      ) : (
        <Project contractAddress={contractAddress} />
      )}
    </div>
  )
}

export default Collection
