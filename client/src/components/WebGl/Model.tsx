import { useRef, Suspense } from "react";
import { useLoader, useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface Props {
    modelPath: any;
    scale: number;
    position?: Array<number>
}

const GltfModel = ({ modelPath, scale, position = [0, 0, 0] }: Props) => {
    const ref = useRef<any>();
    const gltf = useLoader<any, any, any>(GLTFLoader, modelPath);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => {
        if (ref.current !== undefined) {
            ref.current.rotation.y += 0.003
        }
    });
    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={scale}
                // onPointerOver={() => hover(true)}
                // onPointerOut={() => hover(false)}
            />
        </>
    );
};

const ModelViewer = ({ modelPath, scale, position = [0, 0, 0] }: Props) => {
    return (
        <Canvas>
            <ambientLight intensity={0.3} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Suspense fallback={null}>
                <GltfModel modelPath={modelPath} scale={scale} position={position} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default ModelViewer;