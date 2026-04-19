import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Holmium: rare earth metallic crystal, bright orange glow accents, lasers. */
const CENTER = [0, 1.2, -1.5] as const

export function Holmium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#b0a898"
          metalness={0.82}
          roughness={0.3}
          emissive="#603010"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.18, 0.2, 0.15]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#e07030" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}
