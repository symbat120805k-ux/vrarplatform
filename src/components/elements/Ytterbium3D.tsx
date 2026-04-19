import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Ytterbium: metallic crystal with subtle golden highlights, atomic clocks, instruments. */
const CENTER = [0, 1.2, -1.5] as const

export function Ytterbium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          color="#b8b0a0"
          metalness={0.86}
          roughness={0.24}
        />
      </mesh>
      <mesh position={[0.14, 0.14, 0.2]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#d8c060" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
