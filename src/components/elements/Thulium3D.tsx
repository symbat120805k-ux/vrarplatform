import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Thulium: rare metallic crystal, cool blue luminous highlights, medical/laser tech. */
const CENTER = [0, 1.2, -1.5] as const

export function Thulium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#a8b8c8"
          metalness={0.84}
          roughness={0.28}
          emissive="#204060"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0.15, 0.18, 0.18]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#60a0e0" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
