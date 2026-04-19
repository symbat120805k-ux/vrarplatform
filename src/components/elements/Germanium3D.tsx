import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Germanium: dark gray semiconductor crystal, circuit-like glow lines. */
const CENTER = [0, 1.2, -1.5] as const

export function Germanium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#3c4048"
          metalness={0.45}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.1, 0.1, 0.18]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.2, 0.04]} />
        <meshBasicMaterial color="#44aaff" transparent opacity={0.85} />
      </mesh>
      <mesh position={[-0.08, -0.08, 0.18]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.15, 0.04]} />
        <meshBasicMaterial color="#66cc88" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
