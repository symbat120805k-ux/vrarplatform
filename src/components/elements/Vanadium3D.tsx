import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Vanadium: dark bluish-gray metallic crystal, sharp facets, industrial. */
const CENTER = [0, 1.2, -1.5] as const

export function Vanadium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#607080"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}
