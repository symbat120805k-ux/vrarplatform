import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Manganese: rough dark gray mineral cluster, irregular crystal, ore-like. */
const CENTER = [0, 1.2, -1.5] as const

export function Manganese3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#4a4a50"
          metalness={0.6}
          roughness={0.65}
        />
      </mesh>
      <mesh position={[0.12, 0.1, 0.08]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#3a3a40" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-0.08, -0.06, 0.1]}>
        <boxGeometry args={[0.1, 0.14, 0.08]} />
        <meshStandardMaterial color="#424248" metalness={0.55} roughness={0.68} />
      </mesh>
    </group>
  )
}
