import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Text3D } from '@react-three/drei';

import { ControlHints } from './ControlHints';

import './App.css';

function App() {
  const [bannerText, setBannerText] = useState<string>('Hello Vinci4D');
  const [thiccnessRatio, setThiccnessRatio] = useState<number>(0.5);
  const [speedFactor, setSpeedFactor] = useState<number>(0.5);
  const [bannerColor, setBannerColor] = useState<string>('#DDDDDD');
  const [lightColor, setLightColor] = useState<string>('#DDEEFF');

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
                setThiccnessRatio(parseFloat(evt.currentTarget.value));
              }}
            ></input>
          </label>
          <label>
            Speeeed
            <input
              type="range"
              value={speedFactor}
              min={0}
              max={1}
              step={0.01}
              onInput={(evt) => {
                setSpeedFactor(parseFloat(evt.currentTarget.value));
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
                font="/quicksand-regular-font.json"
                height={thiccnessRatio}
                bevelEnabled
                bevelSegments={20}
                bevelSize={thiccnessRatio / 10}
                bevelThickness={0.5}
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
