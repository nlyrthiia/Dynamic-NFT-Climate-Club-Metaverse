import React, { useState } from "react"
import { PlusCircleIcon } from "@heroicons/react/outline"
import { toast } from "react-toastify"

import { lv1NFT, lv2NFT, lv3NFT } from "../data"
import { splitNFT } from "../library"

const SplitForm = ({ cot, tokenId, setRefresh, setModalIsOpen, setIsLoading }) => {
  const [inputFields, setInputFields] = useState([{ cot: "", cot_unit_price: "" }])
  const handleFormChange = (index, e) => {
    let data = [...inputFields]
    data[index][e.target.name] = e.target.value
    setInputFields(data)
  }
  const handleAddField = () => {
    let newfield = { cot: "", cot_unit_price: "" }
    setInputFields([...inputFields, newfield])
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let totalCot = inputFields.reduce((acc, cur) => {
      return acc + Number(cur.cot)
    }, 0)
    if (totalCot !== Number(cot)) {
      return toast.error(`Total COT must be ${cot}`)
    }
    let nftArray = inputFields.map((field) => {
      if (Number(field.cot) <= 8000 && Number(field.cot) > 5333) {
        return {
          ...lv1NFT[Math.floor(Math.random() * (lv1NFT.length - 1))],
          cot: Number(field.cot),
          neutralized: false,
        }
      } else if (Number(field.cot) <= 5333 && Number(field.cot) > 2666) {
        return {
          ...lv2NFT[Math.floor(Math.random() * (lv2NFT.length - 1))],
          cot: Number(field.cot),
          neutralized: false,
        }
      } else {
        return {
          ...lv3NFT[Math.floor(Math.random() * (lv2NFT.length - 1))],
          cot: Number(field.cot),
          neutralized: false,
        }
      }
    })
    try {
      setIsLoading(true)
      await splitNFT(tokenId, nftArray)
      setIsLoading(false)
      setModalIsOpen(false)
      setRefresh((prev) => !prev)
      toast.success("Successfully split NFT")
      toast.clearWaitingQueue()
    } catch (e) {
      toast.error("Something went wrong")
    }
  }
  return (
    <form>
      {inputFields.map((input, index) => {
        return (
          <div key={index} className="space-y-6 p-4 first:pt-0 border-b border-gray-200">
            <h1 className="text-2xl font-bold">
              {index === 0 ? "Oringinal NFT" : `NFT ${index + 1}`}
            </h1>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center justify-start gap-2">
                <label htmlFor="cot" className="flex flex-col items-start justify-center">
                  <p>Carbon offsets Credits（COT）</p>
                  <p>(unit: ton)</p>
                </label>
                <input
                  type="number"
                  value={input.cot}
                  onChange={(event) => handleFormChange(index, event)}
                  step={1}
                  min={0}
                  id="cot"
                  name="cot"
                  className="border border-gray-200 p-2 rounded-xl focus-visible:border-[#73c000]"
                />
              </div>
              <div className="flex items-center justify-start gap-2">
                <label
                  htmlFor="cot_unit_price"
                  className="flex flex-col items-start justify-center"
                >
                  <p>COT unit Price</p>
                  <p>(unit: $/t)</p>
                </label>
                <input
                  type="number"
                  value={input.cot_unit_price}
                  onChange={(event) => handleFormChange(index, event)}
                  step={0.01}
                  min={0}
                  id="cot_unit_price"
                  name="cot_unit_price"
                  className="border border-gray-200 p-2 rounded-xl focus-visible:border-[#73c000]"
                />
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <div className="flex flex-col items-start justify-center">
                <p className="text-xl">DNFT Price: </p>
                <p>(unit: DAI)</p>
              </div>
              <p className="text-xl">{input.cot * input.cot_unit_price} DAI</p>
            </div>
          </div>
        )
      })}
      <div className="flex items-center justify-center mt-4">
        <PlusCircleIcon className="w-8 h-8 cursor-pointer" onClick={handleAddField} />
      </div>
      <button
        className="rounded-xl w-full text-lg font-bold p-4 bg-[#FFFAD0] mt-4"
        onClick={handleSubmit}
      >
        Split
      </button>
    </form>
  )
}

export default SplitForm
