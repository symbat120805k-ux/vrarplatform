import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Strontium: pale metallic sample + red glow accent (fireworks red). */
const CENTER = [0, 1.2, -1.5] as const

export function Strontium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#a8a8b0"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.22, 0.15]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#e03030"
          emissive="#c02020"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  )
}
