import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Promethium: radioactive — dark metallic core, faint green glow. */
const CENTER = [0, 1.2, -1.5] as const

export function Promethium3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime * 1) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#404850"
          metalness={0.8}
          roughness={0.35}
          emissive="#0a3020"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  )
}
