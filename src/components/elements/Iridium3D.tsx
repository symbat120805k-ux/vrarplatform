import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Iridium: bright polished silver, corrosion-resistant, meteorites, high-performance. */
const CENTER = [0, 1.2, -1.5] as const

export function Iridium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#e0e4e8"
          metalness={0.95}
          roughness={0.08}
        />
      </mesh>
    </group>
  )
}
