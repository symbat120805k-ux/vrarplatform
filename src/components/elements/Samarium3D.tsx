import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Samarium: metallic crystal, subtle blue magnetic accents, magnets and electronics. */
const CENTER = [0, 1.2, -1.5] as const

export function Samarium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#a8b0b8"
          metalness={0.85}
          roughness={0.28}
          emissive="#203050"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0.2, 0.15, 0.12]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#5080c0" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
