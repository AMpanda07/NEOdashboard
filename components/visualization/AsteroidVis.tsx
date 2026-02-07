"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- Types ---
type AsteroidWithData = {
    id: string;
    name: string;
    estimated_diameter: {
        meters: {
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        miss_distance: {
            kilometers: string;
        };
        relative_velocity: {
            kilometers_per_hour: string;
        };
    }[];
    is_potentially_hazardous_asteroid: boolean;
};

interface AsteroidVisProps {
    neos: AsteroidWithData[];
}

// --- 3D Components ---

function Earth() {
    return (
        <group>
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color="#4361ee"
                    emissive="#102a43"
                    emissiveIntensity={0.2}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>
            {/* Atmosphere Glow */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#4cc9f0"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

function Asteroid({ data }: { data: AsteroidWithData }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Normalize data for visualization
    const diameter = data.estimated_diameter.meters.estimated_diameter_max;
    const distanceKm = parseFloat(data.close_approach_data[0]?.miss_distance.kilometers || "0");
    const isHazardous = data.is_potentially_hazardous_asteroid;

    // Scale size: Logarithmic scale to make small asteroids visible but large ones not overwhelming
    const size = Math.max(0.05, Math.log10(diameter) * 0.08);

    // Position: Map distance to a visible range (e.g., 2 to 10 units away)
    // Real scale is impossible, so we condense the astronomical units
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + (Math.log10(distanceKm) * 0.8);
    const yOffset = (Math.random() - 0.5) * 2;

    const position = useMemo(() => {
        return new THREE.Vector3(
            Math.cos(angle) * radius,
            yOffset,
            Math.sin(angle) * radius
        );
    }, [angle, radius, yOffset]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    const color = isHazardous ? "#d90429" : "#a9a9a9";

    return (
        <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
            <group position={position}>
                <mesh ref={meshRef} title={`Asteroid: ${data.name}`}>
                    <dodecahedronGeometry args={[size, 0]} /> {/* Low poly look */}
                    <meshStandardMaterial
                        color={color}
                        roughness={0.8}
                        metalness={0.2}
                        flatShading={true}
                    />
                </mesh>
                {/* Label shown on hover? For now just static simplified text if hazardous */}
                {isHazardous && (
                    <Text
                        position={[0, size + 0.2, 0]}
                        fontSize={0.2}
                        color="#ff0054"
                        anchorX="center"
                        anchorY="middle"
                    >
                        !
                    </Text>
                )}
            </group>
        </Float>
    );
}

export default function AsteroidVis({ neos }: AsteroidVisProps) {
    return (
        <div className="w-full h-full bg-black">
            <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
                <color attach="background" args={['#000000']} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd60a" />
                <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4361ee" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Earth />

                {neos.map((neo) => (
                    <Asteroid key={neo.id} data={neo} />
                ))}

                <OrbitControls
                    enablePan={false}
                    minDistance={3}
                    maxDistance={20}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
