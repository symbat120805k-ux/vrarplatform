import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Lithium: soft silvery metal block, rounded edges, brushed metal, battery accent. */
const CENTER = [0, 1.2, -1.5] as const

export function Lithium3D() {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={groupRef} position={CENTER}>
      <mesh>
        <boxGeometry args={[0.5, 0.35, 0.3]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.85}
          roughness={0.35}
          envMapIntensity={1}
        />
      </mesh>
      <mesh position={[0.12, 0.08, 0.18]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#88cc88" emissive="#448844" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
