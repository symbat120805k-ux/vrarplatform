import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Potassium: very soft silvery alkali metal, gentle violet accent (flame color). */
const CENTER = [0, 1.2, -1.5] as const

export function Potassium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.48, 0.32, 0.32]} />
        <meshStandardMaterial
          color="#a8a8b0"
          metalness={0.75}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0.2, 0.08, 0]} scale={[0.5, 1, 1]}>
        <planeGeometry args={[0.28, 0.35]} />
        <meshStandardMaterial color="#c8c8d0" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.18, 0.1]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#c090e0" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
