import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Calcium: pale silvery-gray metal, mineral/bone connection, matte silver-gray. */
const CENTER = [0, 1.2, -1.5] as const

export function Calcium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.4, 0.35, 0.3]} />
        <meshStandardMaterial
          color="#9a9a9e"
          metalness={0.6}
          roughness={0.55}
        />
      </mesh>
      <mesh position={[0.08, 0.12, 0.16]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#b0b0b4" metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  )
}
