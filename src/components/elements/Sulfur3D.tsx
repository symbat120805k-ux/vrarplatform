import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Sulfur: bright yellow crystal/mineral, clustered, vivid yellow. */
const CENTER = [0, 1.2, -1.5] as const

export function Sulfur3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.35, 0.28, 0.3]} />
        <meshStandardMaterial
          color="#e8c830"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      <mesh position={[0.12, 0.1, 0.12]}>
        <boxGeometry args={[0.15, 0.12, 0.14]} />
        <meshStandardMaterial color="#f0d840" roughness={0.65} />
      </mesh>
      <mesh position={[-0.08, -0.06, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color="#e0c020" roughness={0.7} />
      </mesh>
    </group>
  )
}
