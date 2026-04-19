import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Sodium: soft silvery alkali metal, cut surface, faint reactive aura, dull outer / bright inner. */
const CENTER = [0, 1.2, -1.5] as const

export function Sodium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.45, 0.3, 0.35]} />
        <meshStandardMaterial
          color="#b8b8b8"
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[0.18, 0, 0]} scale={[0.6, 1, 1]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#88aaff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.1, -0.15, 0.1]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color="#88aaff" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
