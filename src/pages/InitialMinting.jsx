import React, { useState } from "react"
import { GlobeIcon } from "@heroicons/react/outline"

import bg from "../assets/bg.png"

const InitialMinting = () => {
  const [input, setInput] = useState({
    cot_amout: "",
    cot_unit_price: "",
  })
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  return (
    <div className="bg-cover bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
      <div className="h-[calc(100vh-100px)] container mx-auto pt-20">
        <h1 className="text-6xl text-center font-bold mb-24">Initial Minting</h1>
        <div className="rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-start gap-4 bg-white">
            <GlobeIcon className="w-6 h-6" />
            <h2 className="font-bold">Initial Minting</h2>
          </div>
          <div className="p-4 space-y-10 bg-[#FBFDFF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-2">
                <label htmlFor="cot_amount" className="flex flex-col items-start justify-center">
                  <p>Carbon offsets Credits（COT）</p>
                  <p>(unit: ton)</p>
                </label>
                <input
                  type="number"
                  value={input.cot_amout}
                  onChange={handleChange}
                  step={1}
                  min={0}
                  id="cot_amount"
                  name="cot_amout"
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
                  onChange={handleChange}
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
                <p className="text-xl">Total NFT Price: </p>
                <p>(unit: DAI)</p>
              </div>

              <p className="text-2xl font-bold">{input.cot_amout * input.cot_unit_price} DAI</p>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <button className="p-3 px-10 text-white rounded-xl bg-[#73ca67] font-bold">Mint</button>
        </div>
      </div>
    </div>
  )
}

export default InitialMinting
