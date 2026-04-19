import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Magnesium: light silvery-white metal bar, clean, subtle bright white spark accent. */
const CENTER = [0, 1.2, -1.5] as const

export function Magnesium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.18, 0.5, 16]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.22, 0.15, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
