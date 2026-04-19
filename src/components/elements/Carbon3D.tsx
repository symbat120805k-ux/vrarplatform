import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Carbon: dual form — diamond-like crystal + dark graphite layers. */
const CENTER = [0, 1.2, -1.5] as const

export function Carbon3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={groupRef} position={CENTER}>
      {/* Diamond side: transparent crystal */}
      <mesh position={[0.2, 0, 0]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshPhysicalMaterial
          color="#e8f4fc"
          transparent
          opacity={0.92}
          roughness={0.05}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      {/* Graphite side: dark layered */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.25, 0.25, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]} scale={[1, 1, 0.3]}>
        <boxGeometry args={[0.2, 0.2, 0.05]} />
        <meshStandardMaterial color="#252525" metalness={0.15} roughness={0.85} />
      </mesh>
    </group>
  )
}
