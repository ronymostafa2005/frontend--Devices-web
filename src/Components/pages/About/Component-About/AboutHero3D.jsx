import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"

/**
 * Abstract “headset + tech” cluster — emerald / teal palette to match Modern Devices.
 */
function DeviceCluster() {
    return (
        <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.55}>
            <group>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.12, 0.06, 16, 56]} />
                    <meshStandardMaterial
                        color="#047857"
                        metalness={0.72}
                        roughness={0.22}
                    />
                </mesh>
                <mesh position={[-0.9, 0, 0]}>
                    <sphereGeometry args={[0.36, 40, 40]} />
                    <meshStandardMaterial
                        color="#0d9488"
                        metalness={0.48}
                        roughness={0.32}
                    />
                </mesh>
                <mesh position={[0.9, 0, 0]}>
                    <sphereGeometry args={[0.36, 40, 40]} />
                    <meshStandardMaterial
                        color="#0d9488"
                        metalness={0.48}
                        roughness={0.32}
                    />
                </mesh>
                <mesh position={[0, 0, 0.08]} rotation={[0.25, 0, 0]}>
                    <torusKnotGeometry args={[0.32, 0.09, 64, 12]} />
                    <meshStandardMaterial
                        color="#059669"
                        metalness={0.55}
                        roughness={0.28}
                    />
                </mesh>
                <mesh position={[0, -0.35, 0.15]} rotation={[0.4, 0, 0]}>
                    <boxGeometry args={[0.14, 0.42, 0.1]} />
                    <meshStandardMaterial
                        color="#065f46"
                        metalness={0.75}
                        roughness={0.2}
                    />
                </mesh>
            </group>
        </Float>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 5]} intensity={1.15} />
            <directionalLight
                position={[-4, 3, -3]}
                intensity={0.4}
                color="#a7f3d0"
            />
            <pointLight position={[0, -2, 3]} intensity={0.45} color="#6ee7b7" />
            <DeviceCluster />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.75}
                autoRotate
                autoRotateSpeed={0.55}
                makeDefault
            />
        </>
    )
}

export default function AboutHero3D() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, [])

    if (!ready) {
        return (
            <div
                className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/20 via-emerald-50/20 to-teal-100/30"
                aria-hidden
            />
        )
    }

    return (
        <div className="absolute inset-0">
            <Canvas
                className="h-full w-full touch-none"
                camera={{ position: [0, 0.15, 4.35], fov: 42 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}
