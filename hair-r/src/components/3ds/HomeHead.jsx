"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AmbientLight, DirectionalLight } from "@react-three/fiber";
import { PerspectiveCamera, Bounds } from "@react-three/drei";
import { useHover } from "@react-three/fiber";

import Model from "./Head";

function SpinningModel(props) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group
      {...props}
      ref={mesh}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <Model scale={2} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[1, 1, 1]} />
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />
      <Bounds fit clip observe margin={1.5}>
        <SpinningModel />
      </Bounds>
    </>
  );
}
export function NftHead() {
  <Canvas style={{ background: "#82DBC5", width: "100%", height: "100%" }}>
    <Scene />
  </Canvas>;
}
export default function ThreeDScene() {
  return (
    <Canvas style={{ background: "#82DBC5", width: "100vw", height: "100vh" }}>
      <Scene />
    </Canvas>
  );
}
