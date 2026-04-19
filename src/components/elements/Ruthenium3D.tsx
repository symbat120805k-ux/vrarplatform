import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Ruthenium: hard dark silver crystal, sharp facets, electronics and catalysts. */
const CENTER = [0, 1.2, -1.5] as const

export function Ruthenium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <tetrahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#606870"
          metalness={0.88}
          roughness={0.28}
        />
      </mesh>
    </group>
  )
}
