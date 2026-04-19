import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Boron: dark crystalline semimetal, angular, charcoal, mineral-like. */
const CENTER = [0, 1.2, -1.5] as const

export function Boron3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0.15, 0.12, 0.1]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.7} />
      </mesh>
      <mesh position={[-0.1, -0.08, 0.15]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#252525" metalness={0.4} roughness={0.7} />
      </mesh>
    </group>
  )
}
