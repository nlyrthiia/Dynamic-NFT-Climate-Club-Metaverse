import clsx from "clsx"
import React, { useState } from "react"
import { ChevronUpIcon } from "@heroicons/react/outline"

const Accordion = ({ Icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <div className="rounded-xl w-full bg-white border border-gray-200">
        <h2 className="block relative">
          <button
            className={clsx(
              "w-full p-4 flex items-center justify-start gap-2 font-bold border-b border-gray-200",
              !isOpen && "border-none",
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Icon className="w-5 h-5" />
            {title}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <ChevronUpIcon
                className={clsx(
                  "w-6 h-6 transition-transform duration-300",
                  !isOpen && "rotate-180",
                )}
              />
            </div>
          </button>
        </h2>
        <div
          className={clsx(
            "w-full max-h-[1000px] transition-max-h duration-300 overflow-hidden bg-[#fbfffb]",
            !isOpen && "max-h-0",
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Accordion
