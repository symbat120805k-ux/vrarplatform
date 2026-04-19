import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Thorium: dense metallic crystal, silver-gray, subtle internal warm glow, nuclear. */
const CENTER = [0, 1.2, -1.5] as const

export function Thorium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.33, 0]} />
        <meshStandardMaterial
          color="#808890"
          metalness={0.86}
          roughness={0.35}
          emissive="#302010"
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  )
}
