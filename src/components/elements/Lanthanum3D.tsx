import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Lanthanum: rare earth metallic crystal, soft silvery, subtle futuristic glow, optics. */
const CENTER = [0, 1.2, -1.5] as const

export function Lanthanum3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.33, 0]} />
        <meshStandardMaterial
          color="#b8c0c8"
          metalness={0.82}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.14, 0.12, 0.18]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#70a0d0" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
