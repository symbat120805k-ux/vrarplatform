import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Gallium: soft metal that melts in hand — solid sample + small liquid pool at bottom. */
const CENTER = [0, 1.2, -1.5] as const

export function Gallium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.28, 0.22, 0.18]} />
        <meshStandardMaterial
          color="#c8d0d8"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#b0b8c0"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}
