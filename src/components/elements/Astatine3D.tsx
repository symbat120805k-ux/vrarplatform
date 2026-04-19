import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Astatine: dark halogen-like, black metallic crystal, subtle violet radioactive aura. */
const CENTER = [0, 1.2, -1.5] as const

export function Astatine3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color="#2a2830"
          metalness={0.6}
          roughness={0.45}
          emissive="#201030"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.18, 0.18, 0.12]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#8060a0" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
