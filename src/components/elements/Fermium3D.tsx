import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, MeshStandardMaterial } from 'three'

/** Fermium: dense synthetic radioactive crystal, deep metallic, subtle magenta-blue pulse. */
const CENTER = [0, 1.2, -1.5] as const

export function Fermium3D() {
  const groupRef = useRef<Group>(null)
  const matRef = useRef<MeshStandardMaterial>(null)

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 0.9) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.29, 0]} />
        <meshStandardMaterial
          ref={matRef}
          color="#504858"
          metalness={0.84}
          roughness={0.35}
          emissive="#302040"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}
