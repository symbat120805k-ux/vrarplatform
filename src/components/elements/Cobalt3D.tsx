import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Cobalt: metallic crystal with faint blue tint, pigments/batteries. */
const CENTER = [0, 1.2, -1.5] as const

export function Cobalt3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#7080a0"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}
