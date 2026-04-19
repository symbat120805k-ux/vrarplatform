import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Curium: heavy radioactive metal, bright violet-blue energy accents. */
const CENTER = [0, 1.2, -1.5] as const

export function Curium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#606070"
          metalness={0.84}
          roughness={0.33}
          emissive="#303060"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0.18, 0.18, 0.15]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#7080d0" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
