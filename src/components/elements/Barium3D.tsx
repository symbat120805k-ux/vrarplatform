import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Barium: pale metallic sample + green glowing accents (fireworks green). */
const CENTER = [0, 1.2, -1.5] as const

export function Barium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.3, 0.28, 0.2]} />
        <meshStandardMaterial
          color="#a8b0b8"
          metalness={0.8}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0.2, 0.18, 0.12]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#40c040"
          emissive="#208020"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}
