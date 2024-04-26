import React, { useRef } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';



export function Pointer(props) {
  const { nodes, materials } = useGLTF('character/map_pointer4.glb')
  const cubeRef = useRef();
  useFrame((state, delta) => {
    cubeRef.current.rotation.z+= 0.015;
  })

  return (
    <>
    <OrbitControls />
    <group {...props} dispose={null} >

      <group position={[-160, 24, 410]} rotation={[-Math.PI / 2, 0, 0]} ref={cubeRef}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.06}>
          <group scale={80}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane_Insides_0.geometry}
              material={materials.Insides}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane_Outsides_0.geometry}
              material={materials.Outsides}
            />
          </group>
        </group>
      </group>
    </group>
    </>
  )
}

useGLTF.preload('character/map_pointer4.glb')
