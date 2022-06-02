import React from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"

import { Earth, YoutubeEmbed } from "../components"
import { ReactComponent as Telegram } from "../assets/telegram.svg"
import { ReactComponent as Twitter } from "../assets/twitter.svg"
import { ReactComponent as Discord } from "../assets/discord.svg"

const Home = () => {
  return (
    <div
      className="w-full h-[calc(100vh-100px)] relative"
      style={{
        backgroundImage: `url(${require("../assets/bg.png")}), linear-gradient(to right top, #BFECB2, #DAFAE2)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto h-full grid grid-cols-2 gap-4 relative">
        <section className="p-10 pt-20 flex flex-col justify-start items-start space-y-4">
          <div>
            <h1 className="text-5xl leading-normal mb-4">
              Dynamic NFT Climate Club <strong className="text-[#73c000]">Metaverse</strong>
            </h1>
            <p className="text-xl">
              Dynamic NFT Climate Club Metaverse (DCCM) aims to connect NFT and voluntarily carbon
              market to encourage carbon emissions offsetting and become carbon neutral.
            </p>
          </div>
          <YoutubeEmbed embedId="eeMJcMCoONk" />
        </section>
        <section className="">
          <Canvas>
            <Suspense fallback={null}>
              <Earth />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                panSpeed={0.5}
                rotateSpeed={0.4}
                target={[0, 0, 3]}
              />
            </Suspense>
          </Canvas>
        </section>
        <div className="flex items-center justify-cneter gap-10 absolute bottom-10 left-0">
          <a href={`https://t.me/DCCMs`} target="_blank" rel="noopener noreferrer">
            <Telegram className="cursor-pointer" />
          </a>
          <Twitter className="cursor-pointer" />
          <Discord className="cursor-pointer w-12 h-12"/>
        </div>
      </div>
    </div>
  )
}

export default Home
