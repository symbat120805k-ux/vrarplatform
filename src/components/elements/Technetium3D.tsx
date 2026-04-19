import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Technetium: radioactive — dark metallic core, faint green/blue energy glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Technetium3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.007
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#4a5058"
          metalness={0.75}
          roughness={0.35}
          emissive="#204040"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0.22, 0.18, 0.18]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#40c0c0" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.18, -0.12, 0.2]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#60a0d0" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
