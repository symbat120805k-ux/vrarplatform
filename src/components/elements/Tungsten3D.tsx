import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Tungsten: very dense dark metallic rod/filament, light bulb, heavy and durable. */
const CENTER = [0, 1.2, -1.5] as const

export function Tungsten3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 16]} />
        <meshStandardMaterial
          color="#454a52"
          metalness={0.9}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
        <meshStandardMaterial color="#4a4e56" metalness={0.88} roughness={0.4} />
      </mesh>
    </group>
  )
}
