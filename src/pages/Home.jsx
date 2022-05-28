import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import { Earth } from "../components";
import { ReactComponent as Discord } from "../assets/discord.svg";
import { ReactComponent as Twitter } from "../assets/twitter.svg";

const Home = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] relative bg-gradient-to-tr from-[#BFECB2] to-[#DAFAE2]">
      <div className="container mx-auto h-full w-full grid grid-cols-2 gap-4 ">
        <section className="mt-32 pr-10">
          <h1 className="text-6xl leading-normal mb-6">
            Dynamic NFT Climate Club{" "}
            <strong className="text-[#73c000]">Metaverse</strong>
          </h1>
          <p className="text-xl font-thin">
            Dynamic NFT Climate Club Metaverse (DCCM) aims to connect NFT and
            voluntarily carbon market to encourage carbon emissions offsetting
            and become carbon neutral.
          </p>
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
      <div className="flex gap-10 absolute bottom-20 left-40">
        <Discord className="cursor-pointer" />
        <Twitter className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Home;
