import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Scandium: light pale silver metallic crystal, rare tech metal, subtle facets. */
const CENTER = [0, 1.2, -1.5] as const

export function Scandium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#c0c8d0"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
    </group>
  )
}
