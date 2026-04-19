import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Beryllium: rigid, strong, faceted gray-steel block, geometric and structural. */
const CENTER = [0, 1.2, -1.5] as const

export function Beryllium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#8a9a9a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}
