import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Copernicium: reflective sphere inside transparent orbital shell, planetary. */
const CENTER = [0, 1.2, -1.5] as const

export function Copernicium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#b0b8c0" metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.02, 12, 48]} />
        <meshStandardMaterial
          color="#8090a0"
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[0.3, Math.PI / 4, 0.2]}>
        <torusGeometry args={[0.42, 0.015, 8, 40]} />
        <meshStandardMaterial
          color="#708090"
          metalness={0.5}
          roughness={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}
