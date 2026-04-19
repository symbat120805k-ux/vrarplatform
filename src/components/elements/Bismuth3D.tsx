import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Bismuth: stepped crystal with iridescent rainbow surfaces, geometric. */
const CENTER = [0, 1.2, -1.5] as const

export function Bismuth3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.12, 0.35]} />
        <meshStandardMaterial color="#6080c0" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
        <meshStandardMaterial color="#c060a0" metalness={0.45} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.12]} />
        <meshStandardMaterial color="#60c0a0" metalness={0.5} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[0.06, 0.04, 0.06]} />
        <meshStandardMaterial color="#e0a040" metalness={0.5} roughness={0.22} />
      </mesh>
    </group>
  )
}
