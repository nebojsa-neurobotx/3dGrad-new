import React, { Suspense } from "react";
import { Loader, OrbitControls, softShadows, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Character from "./components/Character";
import * as THREE from "three";
import Model  from "./components/Map";
import { Pointer } from "./components/Pointer";
import { Sky, Environment } from "@react-three/drei";

import { Physics, RigidBody } from '@react-three/rapier';




softShadows();
function App() {
  const hemiLight = new THREE.HemisphereLight(0xb91c1c, 0xb91c1c, 1);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.groundColor.setHSL(0.095, 1, 0.75);

  const fov = 80;
  const aspect = 1920 / 1080;
  const near = 1;
  const far = 5000.0;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(25, 500, 25);

  const light = new THREE.DirectionalLight(0x00bfff, 0.31);
  light.position.set(-100, 100, 100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.001;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.left = 50;
  light.shadow.camera.right = -50;
  light.shadow.camera.top = 50;
  light.shadow.camera.bottom = -50;


  // const GLTFModel = () => {
  //   const gltf = useGLTF("/character/mapa-final-test.glb");
  //   return <primitive object={gltf.scene} />;
  // };

  return (
    <div className="w-full h-screen ">
      <Canvas shadows camera={camera}>
        <hemisphereLight {...hemiLight} />/
        <directionalLight {...light} />
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Physics colliders="hull">
          <RigidBody type="fixed" colliders="trimesh">
          <Environment files="/img/sky1.hdr" />
          <Sky />
        
          {/* <RigidBody type="fixed" colliders="trimesh">
          <GLTFModel />
            
          </RigidBody> */}
          <Model></Model>
          <Pointer></Pointer>

          <perspectiveCamera {...camera} />
          <Character camera={camera} />
          </RigidBody>
          </Physics >
          
        </Suspense>
        <fog attach="fog" color="#ffffff" near={150} far={500} />
      </Canvas>
      <Loader
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
        initialState={(active) => active}
      />
    </div>
  );
}

export default App;
