import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import { Earth, YoutubeEmbed } from "../components";
import { ReactComponent as Discord } from "../assets/discord.svg";
import { ReactComponent as Twitter } from "../assets/twitter.svg";

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
      <div className="container mx-auto h-full grid grid-cols-2 gap-4 ">
        <section className="p-10 pt-20 flex flex-col justify-start items-start space-y-4">
          <div>
            <h1 className="text-6xl leading-normal mb-6">
              Dynamic NFT Climate Club{" "}
              <strong className="text-[#73c000]">Metaverse</strong>
            </h1>
            <p className="text-xl">
              Dynamic NFT Climate Club Metaverse (DCCM) aims to connect NFT and
              voluntarily carbon market to encourage carbon emissions offsetting
              and become carbon neutral.
            </p>
          </div>
          <YoutubeEmbed embedId="rokGy0huYEA" />
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
      </div>
      <div className="flex gap-10 absolute bottom-10 left-40">
        <Discord className="cursor-pointer" />
        <Twitter className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Home;
