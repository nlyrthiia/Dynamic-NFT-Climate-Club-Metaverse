import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ChevronDownIcon,
  MenuAlt2Icon,
  DatabaseIcon,
  BookOpenIcon,
  TagIcon,
  ClockIcon,
  FilterIcon,
  XIcon,
  ClipboardListIcon,
  SwitchHorizontalIcon,
  BookmarkIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import { Accordion, GenerationCard, SingleNFTCard, Modal, SplitForm } from "../components"
import chart from "../assets/chart.png"
import WalletContext from "../context/WalletContext"
import { mintNFT, neutralize, getOwner, getNFTInfo } from "../library"
import { collections, initialNFTs } from "../data"
import { toast } from "react-toastify"

const PropertyCard = ({ name, value }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-2 flex flex-col items-center justify-around text-sm gap-3">
      <p className="text-blue-500">{name}</p>
      <p className="font-semibold">{value.toString()}</p>
    </div>
  )
}

const Single = () => {
  const { contractAddress, tokenId } = useParams()
  const [owner, setOwner] = useState("")
  const [refresh, setRefresh] = useState(true)
  const [tokenInfo, setTokenInfo] = useState()
  const { walletInfo } = useContext(WalletContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContext, setModalContext] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getTokenInfo = async () => {
    try {
      const info = await getNFTInfo(tokenId)
      return info
    } catch (err) {
      return {}
    }
  }
  useEffect(() => {
    const fetchOwner = async () => {
      const _owner = await getOwner(tokenId)
      setOwner(_owner)
    }
    fetchOwner()
  }, [tokenId])

  useEffect(() => {
    const getInfo = async () => {
      let info = await getTokenInfo()
      if (!info.imageUrl) {
        setTokenInfo({ ...initialNFTs[tokenId - 1], cot: 8000, neutralized: false })
      } else {
        setTokenInfo(info)
      }
    }
    getInfo()
  }, [tokenId, refresh])

  const [collectionName, collectionInfo] = Object.entries(collections).find(
    (c) => c[1].contractAddress === contractAddress,
  )
  const details = {
    "Contract Address": contractAddress,
    "Token ID": tokenId,
    "Token Standard": "ERC-721",
    Blockchain: "Polygon",
    Metadata: "Frozen",
    "Creator Fees": "2.5%",
    COT: `${tokenInfo?.cot}t`,
  }
  if (!tokenInfo) return null
  return (
    <div className="container mx-auto p-8 space-y-4">
      <AnimatePresence>
        {modalIsOpen && modalContext && (
          <Modal
            handleClose={() => setModalIsOpen(false)}
            title={modalContext}
            Icon={CubeTransparentIcon}
          >
            {modalContext === "Neutralize" ? (
              <div className="flex flex-col items-center justify-between gap-8 relative">
                <p>
                  Have you used the Carbon Offset (COT) in this DNFT to help with carbon
                  neutrality？
                </p>
                <button
                  className="p-2 px-4 rounded-xl bg-red-500 text-white"
                  onClick={() => {
                    if (!walletInfo.address) {
                      toast.error("Please connect to your wallet")
                      toast.clearWaitingQueue()
                      return
                    }
                    const neutralizeCOT = async (tokenId) => {
                      try {
                        setIsLoading(true)
                        await neutralize(tokenId)
                        setIsLoading(false)
                        setModalIsOpen(false)
                        setRefresh((prev) => !prev)
                        toast.success("Successfully neutralize NFT")
                        toast.clearWaitingQueue()
                      } catch (e) {
                        toast.error("Something went wrong")
                        toast.clearWaitingQueue()
                      }
                    }
                    neutralizeCOT(tokenId)
                  }}
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div>
                <SplitForm
                  cot={tokenInfo.cot}
                  tokenId={tokenId}
                  setRefresh={setRefresh}
                  setModalIsOpen={setModalIsOpen}
                  setIsLoading={setIsLoading}
                />
              </div>
            )}
            {isLoading && (
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-300/80 flex items-center justify-center">
                <svg
                  role="status"
                  className="w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#73c000]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {tokenInfo && (
            <SingleNFTCard
              imageUrl={tokenInfo.imageUrl}
              neutralized={Boolean(tokenInfo.neutralized)}
            />
          )}
          <div className="rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold">Sale ends June 22, 2022 at 9:09pm GMT+8</h2>
            </div>
            <div className="p-4 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p>Current Price</p>
                  <p className="text-4xl font-bold">5 DAI</p>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="text-xs space-y-1">
                    <p>Floor Price</p>
                    <p>2 DAI</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>Highest Price</p>
                    <p>8 DAI</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end item-center gap-6">
                {tokenInfo.neutralized ? (
                  <p className="text-xl p-2 border border-gray-200 rounded-xl">Token Neutralized</p>
                ) : owner && owner === walletInfo?.address ? (
                  <>
                    <button
                      className="p-4 rounded-xl bg-[#d5f4ce] font-bold border border-[#73c000]"
                      onClick={() => {
                        setModalIsOpen(true)
                        setModalContext("Split into New NFT")
                      }}
                    >
                      Split into New NFT
                    </button>
                    <button
                      className="p-4 rounded-xl bg-[#73ca67] font-bold"
                      onClick={() => {
                        setModalIsOpen(true)
                        setModalContext("Neutralize")
                      }}
                    >
                      Neutralize
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center justify-center gap-4 p-4 rounded-xl bg-[#d5f4ce] font-bold border border-[#73c000]">
                      <BookmarkIcon className="w-6 h-6" />
                      <p>Make Offer</p>
                    </button>
                    <button
                      className="flex items-center justify-center gap-4 p-4 rounded-xl bg-[#73ca67] font-bold"
                      onClick={async () => {
                        if (!walletInfo.address) {
                          toast.error("Please connect to your wallet")
                          toast.clearWaitingQueue()
                          return
                        }
                        await mintNFT(tokenId, { ...tokenInfo })
                        toast.success("Successfully minted NFT")
                        toast.clearWaitingQueue()
                        let _owner = await getOwner(tokenId)
                        setOwner(_owner)
                      }}
                    >
                      <DatabaseIcon className="w-6 h-6" />
                      <p>Buy Now</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-start gap-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="20" height="20" fill="black" />
                <path
                  d="M19.9938 1.87443C19.9938 0.83959 19.1542 0 18.1194 0C17.0846 0 16.245 0.83959 16.245 1.87443C16.245 2.49802 16.5525 3.04655 17.0211 3.38642L14.279 12.5047C14.0301 12.5169 13.7958 12.5767 13.5822 12.6755L7.35491 6.33778C7.44644 6.11813 7.49769 5.87711 7.49769 5.62328C7.49769 4.58846 6.65812 3.74885 5.62328 3.74885C4.58844 3.74885 3.74885 4.58846 3.74885 5.62328C3.74885 6.22917 4.0405 6.76183 4.48593 7.10418L1.77557 16.2547C0.787106 16.3072 0 17.1188 0 18.1194C0 19.1542 0.83957 19.9938 1.87443 19.9938C2.90926 19.9938 3.74883 19.1542 3.74883 18.1194C3.74883 17.4958 3.44132 16.9491 2.97394 16.6074L5.67453 7.49283C5.9796 7.48368 6.26149 7.40006 6.5129 7.26401L12.6914 13.553C12.5694 13.8007 12.4962 14.0752 12.4962 14.3706C12.4962 15.4054 13.3357 16.245 14.3706 16.245C15.4054 16.245 16.245 15.4054 16.245 14.3706C16.245 13.7494 15.9399 13.2051 15.475 12.8635L18.2183 3.73912C19.2067 3.68664 19.9938 2.87511 19.9938 1.87443Z"
                  fill="black"
                />
              </svg>
              <h2 className="font-bold">Price History</h2>
            </div>
            <div className="p-4">
              <img src={chart} alt="" className="w-full object-contain" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">
            {collectionName} {`#${tokenId}`}
          </h1>
          <p className="font-semibold">{collectionInfo.title}</p>
          <p>
            Owned by{" "}
            {owner ? (
              <Link to={`/account/${owner}`}>
                <span className="text-[#73c000]">{owner}</span>
              </Link>
            ) : (
              <span className="text-[#73c000]">No one</span>
            )}
          </p>
          <Accordion title="Description" Icon={MenuAlt2Icon}>
            <div className="p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum et illum
                aspernatur, aut exercitationem officiis dolor dolore ad sint laudantium architecto?
                Et, repellendus consectetur? Fugit facilis in nobis aut ea.
              </p>
            </div>
          </Accordion>
          <Accordion title="Properties" Icon={ChevronDownIcon}>
            <div className="p-4 grid grid-cols-3 gap-4">
              {tokenInfo &&
                Object.entries(tokenInfo).map((attribute, index) => {
                  if (attribute[0] === "imageUrl") return null
                  return <PropertyCard key={index} name={attribute[0]} value={attribute[1]} />
                })}
            </div>
          </Accordion>
          <Accordion title="Carbon Offset Credits (COT) Info" Icon={DatabaseIcon}>
            <div className="p-4 grid grid-cols-3 gap-4">
              {Object.entries(collectionInfo).map((entry, index) => {
                if (
                  ["title", "contractAddress", "background", "creator", "cot"].includes(entry[0])
                ) {
                  return null
                } else {
                  return <PropertyCard key={index} name={entry[0]} value={entry[1]} />
                }
              })}
            </div>
          </Accordion>
          <Accordion title="Detail" Icon={BookOpenIcon}>
            <div className="p-4 space-y-1">
              {Object.entries(details).map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <p>{entry[0]}:</p>
                  <p>{entry[1]}</p>
                </div>
              ))}
            </div>
          </Accordion>
          <Accordion title="Listing" Icon={BookOpenIcon}>
            <div className="min-h-[50px]"></div>
          </Accordion>
        </div>
      </div>
      <Accordion title="Activities" Icon={TagIcon}>
        <div className="p-4 text-sm space-y-4 border-b border-gray-200">
          <div className="w-[130px] rounded-lg p-2 border border-gray-200 flex items-center justify-between cursor-pointer">
            <div className="flex items-center justify-start gap-1">
              <FilterIcon className="w-5 h-5" />
              <p>Filter</p>
            </div>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="w-[100px] rounded-lg p-2 border border-gray-200 flex items-center justify-between cursor-pointer">
              <div className="flex items-center justify-start gap-1">
                <p>List</p>
              </div>
              <XIcon className="w-5 h-5" />
            </div>
            <div className="w-[100px] rounded-lg p-2 border border-gray-200 flex items-center justify-between cursor-pointer">
              <div className="flex items-center justify-start gap-1">
                <p>Offer</p>
              </div>
              <XIcon className="w-5 h-5" />
            </div>
            <div className="w-[100px] rounded-lg p-2 border border-gray-200 flex items-center justify-between cursor-pointer">
              <div className="flex items-center justify-start gap-1">
                <p>Trade</p>
              </div>
              <XIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex items-center justify-start gap-[200px] p-4">
            <p className="font-bold">Event</p>
            <p className="font-bold">Price</p>
            <p className="font-bold">From</p>
            <p className="font-bold">To</p>
            <p className="font-bold">Date</p>
          </div>
          <div className="flex items-center justify-start gap-2 p-4">
            <ClipboardListIcon className="w-5 h-5" />
            <p>List</p>
          </div>
          <div className="flex items-center justify-start gap-2 p-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect opacity="0.01" width="20" height="20" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0557 13.8339L11.7682 7.54652L12.8398 6.47496L13.5485 7.18368C13.7853 7.42047 14.1909 7.42753 14.4367 7.18174L15.3851 6.23335C15.6334 5.98505 15.6317 5.58992 15.387 5.34521L11.4718 1.43C11.235 1.19321 10.8294 1.18615 10.5837 1.43195L9.63526 2.38033C9.38697 2.62863 9.3886 3.02376 9.63332 3.26848L10.5588 4.19397L6.35208 8.40071L5.46648 7.51512C5.22969 7.27833 4.82413 7.27127 4.57834 7.51706L3.62995 8.46545C3.38165 8.71375 3.38329 9.10888 3.628 9.35359L7.54321 13.2688C7.78 13.5056 8.18556 13.5126 8.43135 13.2669L9.37974 12.3185C9.62804 12.0702 9.6264 11.675 9.38169 11.4303L8.63306 10.6817L9.94345 9.37131L16.2309 15.6587C16.4804 15.9083 16.874 15.9064 17.118 15.6624L18.0593 14.7211C18.3058 14.4746 18.3016 14.0799 18.0557 13.8339ZM3.2129 16.5922H9.5871V17.4961H10.2371V19.2026H2.5V17.4961H3.2129V16.5922Z"
                fill="black"
              />
            </svg>
            <p>Offer</p>
          </div>
          <div className="flex items-center justify-start gap-2 p-4">
            <SwitchHorizontalIcon className="w-5 h-5" />
            <p>Trade</p>
          </div>
        </div>
      </Accordion>
      <Accordion title="Changing History" Icon={ClockIcon}>
        <div className="flex items-center justify-start gap-4 p-4">
          <GenerationCard generation="4th" cot={4} />
          <GenerationCard generation="3rd" cot={30} />
          <GenerationCard generation="2nd" cot={100} />
        </div>
      </Accordion>
    </div>
  )
}

export default Single
