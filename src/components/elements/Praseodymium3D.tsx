import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Praseodymium: soft metallic crystal, greenish highlights, magnets and colored glass. */
const CENTER = [0, 1.2, -1.5] as const

export function Praseodymium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#a8b8a0"
          metalness={0.8}
          roughness={0.32}
        />
      </mesh>
    </group>
  )
}
