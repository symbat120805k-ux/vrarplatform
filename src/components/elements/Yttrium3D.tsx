import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Yttrium: silvery metallic crystal, subtle futuristic glow (lasers, electronics). */
const CENTER = [0, 1.2, -1.5] as const

export function Yttrium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#c0c8d0"
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0.12, 0.1, 0.18]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#80c0ff" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
