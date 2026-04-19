import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Chromium: mirror-like chrome surface, cylinder or plate, very reflective. */
const CENTER = [0, 1.2, -1.5] as const

export function Chromium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.28, 0.3, 0.35, 24]} />
        <meshStandardMaterial
          color="#e8e8ec"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  )
}
