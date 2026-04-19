import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Tantalum: smooth dark metallic crystal + circuit-like glowing lines, capacitors. */
const CENTER = [0, 1.2, -1.5] as const

export function Tantalum3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          color="#505860"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.1, 0.1, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.18, 0.04]} />
        <meshBasicMaterial color="#4080c0" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.08, -0.08, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.14, 0.035]} />
        <meshBasicMaterial color="#50a0d0" transparent opacity={0.75} />
      </mesh>
    </group>
  )
}
