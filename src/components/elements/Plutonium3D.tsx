import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Plutonium: dense dark core, red-orange internal glow, unstable particle effects. */
const CENTER = [0, 1.2, -1.5] as const

export function Plutonium3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.31, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#504840"
          metalness={0.85}
          roughness={0.35}
          emissive="#402010"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.2, 0.15, 0.12]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#c06030" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
