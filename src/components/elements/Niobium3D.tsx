import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Niobium: shiny metallic crystal, smooth reflective, slight bluish highlights, superconducting. */
const CENTER = [0, 1.2, -1.5] as const

export function Niobium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#a8b0c0"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
