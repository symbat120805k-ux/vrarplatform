import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Rhodium: mirror-polished, extremely reflective, premium — catalysts and jewelry. */
const CENTER = [0, 1.2, -1.5] as const

export function Rhodium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.28, 0.3, 0.32, 32]} />
        <meshStandardMaterial
          color="#f0f0f5"
          metalness={0.98}
          roughness={0.02}
        />
      </mesh>
    </group>
  )
}
