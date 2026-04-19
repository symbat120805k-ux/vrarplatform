import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Arsenic: dark metallic crystal, sharp angular, mineral-like, slightly reflective. */
const CENTER = [0, 1.2, -1.5] as const

export function Arsenic3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <tetrahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#2a2e34"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}
