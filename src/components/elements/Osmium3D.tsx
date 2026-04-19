import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Osmium: very dense metallic crystal, dark bluish metallic, compact — densest element. */
const CENTER = [0, 1.2, -1.5] as const

export function Osmium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#404860"
          metalness={0.9}
          roughness={0.28}
        />
      </mesh>
    </group>
  )
}
