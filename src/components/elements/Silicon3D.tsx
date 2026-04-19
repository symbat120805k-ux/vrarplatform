import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Silicon: dark gray crystalline solid, tech identity, circuit-like glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Silicon3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.4, 0.35, 0.25]} />
        <meshStandardMaterial
          color="#3a3a40"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0.12, 0.08, 0.14]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.08, -0.06, 0.14]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.12, 0.05]} />
        <meshBasicMaterial color="#44cc88" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
