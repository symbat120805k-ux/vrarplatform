import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Californium: compact radioactive core, bright golden-orange glow, energy particles. */
const CENTER = [0, 1.2, -1.5] as const

export function Californium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#585048"
          metalness={0.82}
          roughness={0.35}
          emissive="#503020"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0.2, 0.15, 0.12]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#e0a040" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
