import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, FontData, OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';

import { ControlHints } from './ControlHints';

import './App.css';
import FontJSON from './quicksand-regular-font.json';

// make initial text color reasonable based on user preference
const TEXT_COLOR_INIT = window.matchMedia('(prefers-color-scheme: dark)')
  .matches
  ? '#CCEEFF'
  : '#00BBEE';

function App() {
  const textRef = useRef<THREE.Mesh>(null);

  const [bannerText, setBannerText] = useState<string>('Hello Vinci4D');
  const [thiccnessRatio, setThiccnessRatio] = useState<number>(0.5);
  const [twistFactor, setTwistFactor] = useState<number>(0);
  const [twistFactorPrev, setTwistFactorPrev] = useState<number | null>(null);
  const [bannerColor, setBannerColor] = useState<string>(TEXT_COLOR_INIT);
  const [lightColor, setLightColor] = useState<string>('#EEEEEE');

  useEffect(() => {
    if (textRef.current) {
      const { geometry } = textRef.current;
      const q = new THREE.Quaternion();
      const ltr = new THREE.Vector3(1, 0, 0);
      const p = geometry.attributes.position.array;
      const twistDelta =
        typeof twistFactorPrev === 'number'
          ? twistFactor - twistFactorPrev
          : twistFactor;

      for (let i = 0; i < p.length; i += 3) {
        q.setFromAxisAngle(ltr, p[i] * twistDelta);

        const newPos = new THREE.Vector3(p[i], p[i + 1], p[i + 2]);
        newPos.applyQuaternion(q);

        p[i] = newPos.x;
        p[i + 1] = newPos.y;
        p[i + 2] = newPos.z;
      }

      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }
    // we don't need to respond to `-Prev` here since it's updated at the same time and the twist resets when other attributes change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twistFactor]);

  return (
    <>
      <main id="main">
        <aside id="controls">
          <label>
            Banner Text
            <input
              type="input"
              value={bannerText}
              onInput={(evt) => {
                setTwistFactorPrev(null);
                setTwistFactor(0);
                setBannerText(evt.currentTarget.value);
              }}
            ></input>
          </label>
          <label>
            Thiccness
            <input
              type="range"
              value={thiccnessRatio}
              min={0}
              max={3}
              step={0.01}
              onInput={(evt) => {
                setTwistFactorPrev(null);
                setTwistFactor(0);
                setThiccnessRatio(parseFloat(evt.currentTarget.value));
              }}
            ></input>
          </label>
          <label>
            Twisty
            <input
              type="range"
              value={twistFactor}
              min={-0.3}
              max={0.3}
              step={0.001}
              onInput={(evt) => {
                setTwistFactorPrev(
                  typeof twistFactorPrev === 'number' ? twistFactor : 0
                );
                setTwistFactor(parseFloat(evt.currentTarget.value));
              }}
            ></input>
          </label>
          <label>
            Banner Color
            <input
              type="color"
              value={bannerColor}
              onInput={(evt) => {
                setBannerColor(evt.currentTarget.value);
              }}
            ></input>
          </label>
          <label>
            Light Color
            <input
              type="color"
              value={lightColor}
              onInput={(evt) => {
                setLightColor(evt.currentTarget.value);
              }}
            ></input>
          </label>
        </aside>
        <div id="viz-root">
          <Canvas>
            <Center>
              <Text3D
                font={FontJSON as unknown as FontData}
                height={thiccnessRatio}
                bevelEnabled
                bevelSegments={20}
                bevelSize={thiccnessRatio / 10}
                bevelThickness={0.5}
                ref={textRef}
              >
                {bannerText}
                <meshPhongMaterial color={bannerColor} />
              </Text3D>
            </Center>
            <ambientLight intensity={0.3} />
            <directionalLight position={[-1, 1, 5]} color={lightColor} />
            <OrbitControls />
          </Canvas>
        </div>
      </main>
      <ControlHints />
    </>
  );
}

export default App;
