import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Hydrogen: light, minimal, one electron orbiting, blue-white glow, gas-like. */
const CENTER = [0, 1.2, -1.5] as const

export function Hydrogen3D() {
  const groupRef = useRef<THREE.Group>(null)
  const electronRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2
    if (electronRef.current) electronRef.current.rotation.y += delta * 1.5
  })

  return (
    <group position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#b8d4e8"
          transparent
          opacity={0.85}
          emissive="#88aacc"
          emissiveIntensity={0.4}
        />
      </mesh>
      <group ref={electronRef} rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[0.6, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      {/* Faint gas particles */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.2 + i * 0.15, 0.1 * (i - 1), -0.1 - i * 0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#aaccff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}
