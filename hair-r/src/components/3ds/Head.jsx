/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\head.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/head.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Busto.geometry} material={materials.Busto} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.756]} />
    </group>
  )
}

useGLTF.preload('/head.glb')

export default Model