import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Zirconium: strong corrosion-resistant metal, sharp-faceted industrial crystal. */
const CENTER = [0, 1.2, -1.5] as const

export function Zirconium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial
          color="#a0a8b0"
          metalness={0.88}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}
