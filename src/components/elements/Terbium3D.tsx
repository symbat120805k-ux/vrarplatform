import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Terbium: metallic crystal with soft green glow, green phosphors in displays. */
const CENTER = [0, 1.2, -1.5] as const

export function Terbium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          color="#a0b0a8"
          metalness={0.84}
          roughness={0.28}
          emissive="#204020"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  )
}
