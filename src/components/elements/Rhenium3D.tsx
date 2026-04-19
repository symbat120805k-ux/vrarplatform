import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Rhenium: rare metallic crystal, deep gray, heat-resistant, jet engines. */
const CENTER = [0, 1.2, -1.5] as const

export function Rhenium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#585c64"
          metalness={0.88}
          roughness={0.32}
        />
      </mesh>
    </group>
  )
}
