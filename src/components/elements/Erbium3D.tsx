import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Erbium: metallic crystal with soft pink glow, fiber-optic lasers. */
const CENTER = [0, 1.2, -1.5] as const

export function Erbium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          color="#c0b0b8"
          metalness={0.84}
          roughness={0.28}
          emissive="#402030"
          emissiveIntensity={0.22}
        />
      </mesh>
    </group>
  )
}
