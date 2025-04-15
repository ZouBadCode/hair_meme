import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


// Model component that loads and displays the 3D model
const Model = ({ modelPath }) => {
    useGLTF.preload(modelPath); // Preload the model
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();
    
    useFrame(() => {
        if (modelRef.current) {
            // Add continuous rotation animation
            modelRef.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={modelRef} object={scene} />;
};

// Main frame component
const FrameAtom = ({ modelPath }) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [50, 50, 5], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                    <Model modelPath={modelPath} />
                </Suspense>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    );
};

export default FrameAtom;